<?php
namespace App\Calculator;

class ChildrenPaymentsOnce extends Payments
{
    private function getOneChildPayments($childNumber, $oneManFamilySalary) : array {
        $payments = [];

        switch ($this->familyInfo['children'][$childNumber]['age']) {
            case 0:
                $payments['child_birth'] = 18004;
                if ($childNumber == 0 && $this->familyInfo['children'][$childNumber]['current_year_birthday']) {
                    $payments['child_birth_mother_price'] = 466617;
                    $payments['child_birth_first'] = 10000;
                } elseif ($childNumber == 1 && $this->familyInfo['children'][$childNumber]['current_year_birthday']) {
                    $payments['child_birth_mother_price'] = 616617;
                }
                if ($childNumber >= 2) {
                    $payments['child_birth_regional'] = 100000;
                }
                break;
            default:
                if ($this->getFamilySalary() <= 7814 && $this->familyInfo['children'][$childNumber]['activity'] == 2) {
                    $payments['child_payment_beginning_school_year'] = 1000;
                }
                break;

        }
        return $payments;
    }

    private function getSocialPaymentContract() {
        $socialPaymentContract = 0;
        if ($this->getChildrenSchoolboyOrLess18() && $this->getFamilySalary() < 7814) {
            $socialPaymentContract = 50000;
        }
        return $socialPaymentContract;
    }

    public function getPayments() : array {
        $payments = [];
        $children = $this->familyInfo['children'];
        $oneManFamilySalary = $this->getFamilySalary();
        if (is_array($children)) {
            foreach ($children as $k => $child) {
                $payments[] = $this->getOneChildPayments($k, $oneManFamilySalary);
            }
        }
        $paymentsResult = [
            'child_birth' => 0,
            'child_birth_mother_price' => 0,
            'child_birth_first' => 0,
            'child_birth_regional' => 0,
            'child_payment_beginning_school_year' => 0,
            'child_easter' => 0,
            'child_social_contract' => 0,
            'child_twins_two' => 0,
            'child_twins_three' => 0,
        ];
        foreach ($payments as $payment) {
            foreach ($payment as $k => $p) {
                $paymentsResult[$k] += $p;
            }
        }

        $schoolboys = $this->getChildrenSchoolboy();
        if ($schoolboys >= 4) {
            $paymentsResult['child_payment_beginning_school_year'] = $schoolboys * 1000;
        }

        $childrenCountLess18 = $this->getChildrenCountLess18();
        if ($childrenCountLess18 >= 4) {
            $paymentsResult['child_easter'] = 1500 * $childrenCountLess18;
        }

        if ($this->familyInfo['twins'] == 2 ) {
            $paymentsResult['child_twins_two'] = 50000;
        }

        if ($this->familyInfo['twins'] >= 3 ) {
            $paymentsResult['child_twins_three'] = 350000;
        }

        $paymentsResult['child_birth_mother_price'] = ($paymentsResult['child_birth_mother_price'] > 616617) ? 616617 : $paymentsResult['child_birth_mother_price'];

        $paymentsResult['children_social_contract'] = $this->getSocialPaymentContract();

        return $paymentsResult;
    }



}