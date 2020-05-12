<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CustomerResource;
use App\Repositories\CustomerRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CustomerController extends Controller
{
    protected $customer_repository;

    public function __construct(CustomerRepository $customer_repository)
    {
        $this->customer_repository = $customer_repository;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $customers = $this->customer_repository->getCustomers();
        if ($customers) {
            return CustomerResource::collection($customers);
        } else {
            return response('', '400');
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'nic' => 'required',
            'item_list.*.mobile' => 'required|min:10|numeric',
        ]);

        try {
            DB::beginTransaction();
            $this->customer_repository->addCustomers($request);
            DB::commit();
            return [
                "success" => true,
                "msg" => "Customer Create Successfully",
            ];
        } catch (Exception $e) {
            DB::rollBack();
            return [
                "success" => false,
                "msg" => $e->getMessage(),
            ];
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            DB::beginTransaction();
            $this->customer_repository->updateCustomer($request, $id);
            DB::commit();
            return [
                "success" => true,
                "msg" => "Customer Update Successfully",
            ];
        } catch (Exception $e) {
            DB::rollBack();
            return [
                "success" => false,
                "msg" => $e->getMessage(),
            ];
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        try {
            DB::beginTransaction();
            $this->customer_repository->deleteCustomer($request);
            DB::commit();
            return [
                "success" => true,
                "msg" => "Customer Deleted Successfully",
            ];
        } catch (Exception $e) {
            DB::rollBack();
            return [
                "success" => false,
                "msg" => $e->getMessage(),
            ];
        }
    }

    public function search(Request $request)
    {
        $customers = $this->customer_repository->searchCustomer($request);
        return CustomerResource::collection($customers);
    }
}
