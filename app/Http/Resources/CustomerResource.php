<?php

namespace App\Http\Resources;

use App\Http\Resources\ContactResource;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'nic' => $this->nic,
            'address' => $this->address->name,
            'contact' => ContactResource::collection($this->contact),

        ];
    }
}
