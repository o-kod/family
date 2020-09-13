<?php
namespace App\Calculator;

class FamilyPayments extends Payments
{
    private function getStudentPayment($oneManFamilySalary, $flag) : int {
        $payments = 0;
        if ($oneManFamilySalary < 7814 && $this->getChildrenCount() > 0) {
            if (($this->familyInfo['citizen']['is_student'] && !isset($this->familyInfo['partner'])) || ($this->familyInfo['citizen']['is_student'] && $this->familyInfo['partner']['is_student'])) {
                $payments = 36000;
            }
        }
        return $payments;
    }

    private function getDisabledChildPayment($flag) : int {
        $payments = 0;
        if ($flag) {
            $payments += 15594 * 12;
            $payments += 2782 * 12;
            $payments += 638 * 12;
            $payments += 10000 * 12;
            $payments += 1000 * 12;
        }
        return $payments;
    }

    private function getDisabledChildPaymentPensionBenefit($flag) : int {
        $payments = 0;
        if ($flag) {
            $payments += 15594 * 12;
        }
        return $payments;
    }

    private function getDisabledChildPaymentHc($flag) : int {
        $payments = 0;
        if ($flag) {
            $payments += 638 * 12;
        }
        return $payments;
    }

    private function getDisabledChildPaymentCare($flag) : int {
        $payments = 0;
        if ($flag) {
            $payments += 10000 * 12;
        }
        return $payments;
    }

    private function getDisabledChildPaymentStatus($flag) : int {
        $payments = 0;
        if ($flag) {
            $payments += 2782 * 12;
        }
        return $payments;
    }

    private function getDisabledChildPaymentMonth($flag) : int {
        $payments = 0;
        if ($flag) {
            $payments += 1000 * 12;
        }
        return $payments;
    }

    private function getDisabledPayment($flag) : int {
        $payments = 0;
        if ($flag) {
            $payments += 187128;
            $payments += 3896 * 12;
            $payments += 666 * 12;
        }
        return $payments;
    }

    private function getDisabledPaymentPensionBenefit($flag) : int {
        $payments = 0;
        if ($flag) {
            $payments += 15594 * 12;
        }
        return $payments;
    }

    private function getDisabledPaymentHc($flag) : int {
        $payments = 0;
        if ($flag) {
            $payments += 666 * 12;
        }
        return $payments;
    }

    private function getDisabledPaymentStatus($flag) : int {
        $payments = 0;
        if ($flag) {
            $payments += 3896 * 12;
        }
        return $payments;
    }

    private function getVeteranPayment($flag) : int {
        $payments = 0;
        if ($flag) {
            $payments += 15594 * 12;
            $payments += 713 * 12;
            $payments += 853 * 12;
        }
        return $payments;
    }

    private function getVeteranPaymentPensionBenefit($flag) : int {
        $payments = 0;
        if ($flag) {
            $payments += 15594 * 12;
        }
        return $payments;
    }

    private function getVeteranPaymentStatus($flag) : int {
        $payments = 0;
        if ($flag) {
            $payments += 713 * 12;
        }
        return $payments;
    }

    private function getVeteranPaymentHc($flag) : int {
        $payments = 0;
        if ($flag) {
            $payments += 853 * 12;
        }
        return $payments;
    }


    private function getWarVeteranPayment($flag) : int {
        $payments = 0;
        if ($flag) {
            $payments += 15594 * 12;
            $payments += 3062 * 12;
            $payments += 17934 * 12;
            $payments += 2086 * 12;
            $payments += 577 * 12;
        }
        return $payments;
    }

    private function getWarVeteranPaymentPensionBenefit($flag) : int {
        $payments = 0;
        if ($flag) {
            $payments += 15594 * 12;
        }
        return $payments;
    }

    private function getWarVeteranPaymentStatus($flag) : int {
        $payments = 0;
        if ($flag) {
            $payments += 3062 * 12;
        }
        return $payments;
    }

    private function getWarVeteranPaymentDisabled($flag) : int {
        $payments = 0;
        if ($flag) {
            $payments += 17934 * 12;
        }
        return $payments;
    }

    private function getWarVeteranPaymentPlus($flag) : int {
        $payments = 0;
        if ($flag) {
            $payments += 2086 * 12;
        }
        return $payments;
    }

    private function getWarVeteranPaymentHc($flag) : int {
        $payments = 0;
        if ($flag) {
            $payments += 577 * 12;
        }
        return $payments;
    }

    private function getRetiredPayment($flag) : int {
        $payments = 0;
        if ($flag) {
            $payments += 187128;
            $payments += 3240;
        }
        return $payments;
    }

    private function getRetiredPaymentPensionBenefit($flag) : int {
        $payments = 0;
        if ($flag) {
            $payments += 15594 * 12;
        }
        return $payments;
    }

    private function getRetiredPaymentTravel($flag) : int {
        $payments = 0;
        if ($flag) {
            $payments += 270 * 12;
        }
        return $payments;
    }

    private function getSoVeteranPayment($flag) : int {
        $payments = 0;
        if ($flag) {
            $payments += 15594 * 12;
            $payments += 694 * 12;
        }
        return $payments;
    }

    private function getSoVeteranPaymentPensionBenefit($flag) : int {
        $payments = 0;
        if ($flag) {
            $payments += 15594 * 12;
        }
        return $payments;
    }

    private function getSoVeteranPaymentStatus($flag) : int {
        $payments = 0;
        if ($flag) {
            $payments += 694 * 12;
        }
        return $payments;
    }


    private function getUnemploymentPayment() : int{

    }

    public function getPayments() : array {
        $oneManFamilySalary = $this->getFamilySalary();

        $paymentsResult = [
            'family_student_payment' => $this->getStudentPayment($oneManFamilySalary, $this->familyInfo['is_student']),
            'family_student_payment_month' => $this->getStudentPayment($oneManFamilySalary, $this->familyInfo['is_student'])/12,



            'family_disabled_child_payment' => $this->getDisabledChildPayment($this->familyInfo['is_child_disabled']),
            'family_disabled_child_payment_month' => $this->getDisabledChildPayment($this->familyInfo['is_child_disabled'])/12,

            'family_disabled_child_payment_pension_benefit' => $this->getDisabledChildPaymentPensionBenefit($this->familyInfo['is_child_disabled']),
            'family_disabled_child_payment_pension_benefit_month' => $this->getDisabledChildPaymentPensionBenefit($this->familyInfo['is_child_disabled'])/12,

            'family_disabled_child_payment_hc' => $this->getDisabledChildPaymentHc($this->familyInfo['is_child_disabled']),
            'family_disabled_child_payment_hc_month' => $this->getDisabledChildPaymentHc($this->familyInfo['is_child_disabled'])/12,

            'family_disabled_child_payment_status' => $this->getDisabledChildPaymentStatus($this->familyInfo['is_child_disabled']),
            'family_disabled_child_payment_status_month' => $this->getDisabledChildPaymentStatus($this->familyInfo['is_child_disabled'])/12,

            'family_disabled_child_payment_care' => $this->getDisabledChildPaymentCare($this->familyInfo['is_child_disabled']),
            'family_disabled_child_payment_care_month' => $this->getDisabledChildPaymentCare($this->familyInfo['is_child_disabled'])/12,

            'family_disabled_child_payment_month' => $this->getDisabledChildPaymentMonth($this->familyInfo['is_child_disabled']),
            'family_disabled_child_payment_month_month' => $this->getDisabledChildPaymentMonth($this->familyInfo['is_child_disabled'])/12,



            'family_disabled_payment' => $this->getDisabledPayment($this->familyInfo['is_disabled']),
            'family_disabled_payment_month' => $this->getDisabledPayment($this->familyInfo['is_disabled'])/12,

            'family_disabled_payment_pension_benefit' => $this->getDisabledPaymentPensionBenefit($this->familyInfo['is_disabled']),
            'family_disabled_payment_pension_benefit_month' => $this->getDisabledPaymentPensionBenefit($this->familyInfo['is_disabled'])/12,

            'family_disabled_payment_hc' => $this->getDisabledPaymentHc($this->familyInfo['is_disabled']),
            'family_disabled_payment_hc_month' => $this->getDisabledPaymentHc($this->familyInfo['is_disabled'])/12,

            'family_disabled_payment_status' => $this->getDisabledPaymentStatus($this->familyInfo['is_disabled']),
            'family_disabled_payment_status_month' => $this->getDisabledPaymentStatus($this->familyInfo['is_disabled'])/12,



            'family_veteran_payment' => $this->getVeteranPayment($this->familyInfo['is_veteran']),
            'family_veteran_payment_month' => $this->getVeteranPayment($this->familyInfo['is_veteran'])/12,

            'family_veteran_payment_pension_benefit' => $this->getVeteranPaymentPensionBenefit($this->familyInfo['is_veteran']),
            'family_veteran_payment_pension_benefit_month' => $this->getVeteranPaymentPensionBenefit($this->familyInfo['is_veteran'])/12,

            'family_veteran_payment_status' => $this->getVeteranPaymentStatus($this->familyInfo['is_veteran']),
            'family_veteran_payment_status_month' => $this->getVeteranPaymentStatus($this->familyInfo['is_veteran'])/12,

            'family_veteran_payment_hc' => $this->getVeteranPaymentHc($this->familyInfo['is_veteran']),
            'family_veteran_payment_hc_month' => $this->getVeteranPaymentHc($this->familyInfo['is_veteran'])/12,



            'family_war_veteran_payment' => $this->getWarVeteranPayment($this->familyInfo['is_war_veteran']),
            'family_war_veteran_payment_month' => $this->getWarVeteranPayment($this->familyInfo['is_war_veteran'])/12,

            'family_war_veteran_payment_pension_benefit' => $this->getWarVeteranPaymentPensionBenefit($this->familyInfo['is_war_veteran']),
            'family_war_veteran_payment_pension_benefit_month' => $this->getWarVeteranPaymentPensionBenefit($this->familyInfo['is_war_veteran'])/12,

            'family_war_veteran_payment_status' => $this->getWarVeteranPaymentStatus($this->familyInfo['is_war_veteran']),
            'family_war_veteran_payment_status_month' => $this->getWarVeteranPaymentStatus($this->familyInfo['is_war_veteran'])/12,

            'family_war_veteran_payment_disabled' => $this->getWarVeteranPaymentDisabled($this->familyInfo['is_war_veteran']),
            'family_war_veteran_payment_disabled_month' => $this->getWarVeteranPaymentDisabled($this->familyInfo['is_war_veteran'])/12,

            'family_war_veteran_payment_plus' => $this->getWarVeteranPaymentPlus($this->familyInfo['is_war_veteran']),
            'family_war_veteran_payment_plus_month' => $this->getWarVeteranPaymentPlus($this->familyInfo['is_war_veteran'])/12,

            'family_war_veteran_payment_hc' => $this->getWarVeteranPaymentHc($this->familyInfo['is_war_veteran']),
            'family_war_veteran_payment_hc_month' => $this->getWarVeteranPaymentHc($this->familyInfo['is_war_veteran'])/12,



            'family_retired_payment' => $this->getRetiredPayment($this->familyInfo['is_retired']),
            'family_retired_payment_month' => $this->getRetiredPayment($this->familyInfo['is_retired'])/12,

            'family_retired_payment_pension_benefit' => $this->getRetiredPaymentPensionBenefit($this->familyInfo['is_retired']),
            'family_retired_payment_pension_benefit_month' => $this->getRetiredPaymentPensionBenefit($this->familyInfo['is_retired'])/12,

            'family_retired_payment_travel' => $this->getRetiredPaymentTravel($this->familyInfo['is_retired']),
            'family_retired_payment_travel_month' => $this->getRetiredPaymentTravel($this->familyInfo['is_retired'])/12,



            'family_so_veteran_payment' => $this->getSoVeteranPayment($this->familyInfo['is_so_veteran']),
            'family_so_veteran_payment_month' => $this->getSoVeteranPayment($this->familyInfo['is_so_veteran'])/12,

            'family_so_veteran_payment_pension_benefit' => $this->getSoVeteranPaymentPensionBenefit($this->familyInfo['is_so_veteran']),
            'family_so_veteran_payment_pension_benefit_month' => $this->getSoVeteranPaymentPensionBenefit($this->familyInfo['is_so_veteran'])/12,

            'family_so_veteran_payment_status' => $this->getSoVeteranPaymentStatus($this->familyInfo['is_so_veteran']),
            'family_so_veteran_payment_status_month' => $this->getSoVeteranPaymentStatus($this->familyInfo['is_so_veteran'])/12,
        ];
        return $paymentsResult;
    }



}