<?php
namespace App\Calculator;

class EducationPayments extends Payments
{
    private function getOneChildPayments($child) : array {
        $payments = [];
        switch ($child['activity']) {
            case 0:
                break;
            case 1:
                $payments['education_kindergarden'] = 90453;
                break;
            case 2:
                $payments['education_school'] = 43054;
                break;
            case 3:
                $payments['education_ptu'] = 76999;
                break;
            case 4:
                $payments['education_vuz'] = 243400;
                break;
            default:
                break;
        }
        return $payments;
    }

    public function getPayments() : array {
        $payments = [];
        $children = $this->familyInfo['children'];
        if (is_array($children)) {
            foreach ($children as $child) {
                $payments[] = $this->getOneChildPayments($child);
            }
        }
        $paymentsResult = [
            'education_kindergarden' => 0,
            'education_school' => 0,
            'education_ptu' => 0,
            'education_vuz' => 0,
        ];
        foreach ($payments as $payment) {
            foreach ($payment as $k => $p) {
                $paymentsResult[$k] += $p;
            }
        }
        return $paymentsResult;
    }



}