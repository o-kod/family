<?php
namespace App\Calculator;

class HealthcarePayments extends Payments
{
    public function getPayments(): array
    {
        $payments = [];
        $familyCount = 1;
        $familyCount += $this->getChildrenCount();
        if (!empty($this->familyInfo['partner'])) {
            $familyCount += 1;
        }
        $payments['healthcare'] = $familyCount * 16187;
        return $payments;
    }
}