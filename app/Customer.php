<?php

namespace App;

use App\Address;
use App\Contact;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    public function address()
    {
        return $this->belongsTo(Address::class, 'id', 'customer_id');
    }

    public function contact()
    {
        return $this->hasMany(Contact::class, 'customer_id', 'id');
    }
}
