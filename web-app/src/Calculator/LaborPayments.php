<?php
namespace App\Calculator;

class LaborPayments extends Payments
{
    public function getPayments() : array {
        $payments = [];
        $payments['unemployment'] = 0;
        $payments['unemployment_month'] = 0;
        $payments['unemployment_children_payment'] = 0;
        $payments['unemployment_children_payment_month'] = 0;
        $childrenCount = $this->getChildrenCountLess18();
        if ($this->familyInfo['citizen']['is_lost_covid']) {
            $payments['unemployment'] += 12*12130;
            $payments['unemployment_children_payment'] += 8*($childrenCount*3000);
        }
        if (!empty($this->familyInfo['partner']) && $this->familyInfo['partner']['is_lost_covid']) {
            $payments['unemployment'] += 12*12130;
			if ($payments['unemployment_children_payment'] == 0) {
				$payments['unemployment_children_payment'] += 8*($childrenCount*3000);
			}
        }
        $payments['unemployment_month'] = $payments['unemployment']/12;
        $payments['unemployment_children_payment_month'] = $payments['unemployment_children_payment']/12;
        return $payments;
    }



}