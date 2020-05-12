<?php
namespace App\Repositories;

use App\Address;
use App\Contact;
use App\Customer;
use Illuminate\Http\Request;

class CustomerRepository
{

    public function getCustomers()
    {
        return Customer::with('address', 'contact')->get();
    }

    public function addCustomers(Request $request)
    {
        $customer = new Customer();
        $customer->name = $request->name;
        $customer->nic = $request->nic;
        $customer->save();

        $address = new Address();
        $address->customer_id = $customer->id;
        $address->name = $request->address;
        $address->save();

        foreach ($request->mobiles as $mobile) {
            $contact = new Contact();
            $contact->mobile = $mobile;
            $contact->customer_id = $customer->id;
            $contact->save();
        }
    }

    public function updateCustomer(Request $request, $id)
    {
        $customer = Customer::find($id);
        $customer->name = $request->name;
        $customer->nic = $request->nic;
        $customer->save();

        $address = Address::where('customer_id', $id)->first();
        $address->name = $request->address;
        $address->save();

        $contact = Contact::where('customer_id',$id)->delete();

        foreach ($request->mobiles as $mobile) {
            $contact = new Contact();
            $contact->mobile = $mobile;
            $contact->customer_id = $customer->id;
            $contact->save();
        }
    }

    public function deleteCustomer($id)
    {
        $customer = Customer::find($id);
        $customer->address()->delete();
        $customer->contact()->delete();
        $customer->delete();
    }

}
