<?php

use App\Address;
use App\Contact;
use App\Customer;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $customer = new Customer();
        $customer->name = "Reshan";
        $customer->nic = "913472754V";
        $customer->save();

        $address = new Address();
        $address->customer_id = $customer->id;
        $address->name = "Galle, Sri Lanka";
        $address->save();

        $mobiles = [
            '0714807733',
            '0711380025',
            '0915788339',
        ];

      
        foreach($mobiles as $mobile){
            $contact = new Contact();
            $contact->mobile = $mobile;
            $contact->customer_id = $customer->id;
            $contact->save();
        }

    }
}
