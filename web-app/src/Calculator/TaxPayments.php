<?php
namespace App\Calculator;

class TaxPayments extends Payments
{
    private function getTaxCar($power) {
        $tax = 0;
        if (!empty($power) && $power > 0) {
            if ($power <= 100) {
                $tax = $power * 16;
            } else if ($power > 100 && $power <= 120) {
                $tax = $power * 24;
            } else if ($power > 120 && $power <= 150) {
                $tax = $power * 33;
            } else if ($power > 150 && $power <= 200) {
                $tax = $power * 43;
            } else if ($power > 200 && $power <= 250) {
                $tax = $power * 75;
            } else {
                $tax = $power * 150;
            }
        }
        return $tax;
    }

    public function getPayments(): array
    {
        $payments = [];

        $salary = $this->getSalary();
        $payments['tax_salary'] = (!empty($salary)) ? $salary*12 * 0.13 : 0;
        $payments['tax_insurance'] = (!empty($salary)) ? $salary*12 * 0.3 : 0;

        $taxCar = $this->getTaxCar($this->familyInfo['car_power']);
        $payments['tax_car'] = (!empty($taxCar)) ? $taxCar : 0;

        if (!empty($this->familyInfo['tax_estate']) && $this->familyInfo['tax_estate'] > 0) {
            $payments['tax_estate'] = $this->familyInfo['tax_estate'];
        } else {
            $payments['tax_estate'] = 0;
        }

        return $payments;
    }
}