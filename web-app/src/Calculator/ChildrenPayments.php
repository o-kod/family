<?php
namespace App\Calculator;

class ChildrenPayments extends Payments
{
    private $childrenActivityNumber;
    private $childrenInactivityNumber;

    private function getOneChildPayments($childNumber, $oneManFamilySalary) : array {
        $payments = [];
        switch ($this->familyInfo['children'][$childNumber]['age']) {
            case 0:
                if ($oneManFamilySalary < 7814) {
                    $payments['monthly_children_payment_year'] = 6720;
                    $payments['monthly_children_payment_year_month'] = 560;
                }
                $payments['maternity_leave'] = 6752 * 12;
                $payments['maternity_leave_month'] = 6752;
                if ($childNumber < 2) {
                    if ($oneManFamilySalary < 15628) {
                        $payments['monthly_children_birth_payment_year'] = 128568;
                        $payments['monthly_children_birth_payment_year_month'] = 10714;
                    }
                } else {
                    if ($oneManFamilySalary < 29706) {
                        $payments['monthly_children_birth_payment_year'] = 130416;
                        $payments['monthly_children_birth_payment_year_month'] = 10868;
                    }
                    $payments['municipal_services'] = 17064;
                }
                $payments['covid'] = 15000;
                break;
            case 1:
                if ($oneManFamilySalary < 7814) {
                    $payments['monthly_children_payment_year'] = 6720;
                    $payments['monthly_children_payment_year_month'] = 560;
                }
                if ($childNumber < 2) {
                    if ($oneManFamilySalary < 15628) {
                        $payments['monthly_children_birth_payment_year'] = 128568;
                        $payments['monthly_children_birth_payment_year_month'] = 10714;
                    }
                } else {
                    if ($oneManFamilySalary < 29706) {
                        $payments['monthly_children_birth_payment_year'] = 130416;
                        $payments['monthly_children_birth_payment_year_month'] = 10868;
                    }
                    $payments['municipal_services'] = 17064;
                }
                if (($this->familyInfo['children'][$childNumber]['activity'] == 0) && ($oneManFamilySalary < 7814)) {
                    if ($this->childrenInactivityNumber == 0) {
                        $payments['children_inactivity'] = 1000 * 12;
                        $payments['children_inactivity_month'] = 1000;
                    } elseif ($this->childrenInactivityNumber == 1) {
                        $payments['children_inactivity'] = 1500 * 12;
                        $payments['children_inactivity_month'] = 1500;
                    } elseif ($this->childrenInactivityNumber >= 2) {
                        $payments['children_inactivity'] = 2000 * 12;
                        $payments['children_inactivity_month'] = 2000;
                    }
                    $this->childrenInactivityNumber++;
                }
                if ($this->familyInfo['children'][$childNumber]['activity'] == 1 && ($oneManFamilySalary < 11720)) {
                    if ($this->childrenActivityNumber == 0) {
                        $payments['children_activity'] = 372 * 12;
                        $payments['children_activity_month'] = 372;
                    } elseif ($this->childrenActivityNumber == 1) {
                        $payments['children_activity'] = 907 * 12;
                        $payments['children_activity_month'] = 907;
                    } elseif ($this->childrenActivityNumber >= 2) {
                        $payments['children_activity'] = 1029 * 12;
                        $payments['children_activity_month'] = 1029;
                    }
                    $this->childrenActivityNumber++;
                }
                $payments['covid'] = 15000;
                break;

            case 2:
                if ($oneManFamilySalary < 7814) {
                    $payments['monthly_children_payment_year'] = 6720;
                    $payments['monthly_children_payment_year_month'] = 560;
                }
                if ($oneManFamilySalary < 7814) {
                    $payments['children_monthly'] = 64284;
                    $payments['children_monthly_month'] = 64284/12;
                }
                if ($this->familyInfo['children'][$childNumber]['activity'] == 1 && ($oneManFamilySalary < 11720)) {
                    if ($this->childrenActivityNumber == 0) {
                        $payments['children_activity'] = 372 * 12;
                        $payments['children_activity_month'] = 372;
                    } elseif ($this->childrenActivityNumber == 1) {
                        $payments['children_activity'] = 907 * 12;
                        $payments['children_activity_month'] = 907;
                    } elseif ($this->childrenActivityNumber >= 2) {
                        $payments['children_activity'] = 1029 * 12;
                        $payments['children_activity_month'] = 1029;
                    }
                    $this->childrenActivityNumber++;
                }
                if ($childNumber >= 2) {
                    $payments['municipal_services'] = 17064;
                }

                $payments['covid'] = 10000;
                break;
            case 3:
                if ($oneManFamilySalary < 7814) {
                    $payments['monthly_children_payment_year'] = 6720;
                    $payments['monthly_children_payment_year_month'] = 560;
                    if ($this->familyInfo['children'][$childNumber]['activity'] == 2) {
                        if ($this->getChildrenCount() >= 3) {
                            $payments['children_nutrition'] = 700 * 9;
                            $payments['children_nutrition_month'] = 700;
                        } else {
                            $payments['children_nutrition'] = 350 * 9;
                            $payments['children_nutrition_month'] = 350;
                        }
                    }
                }
                if ($childNumber >= 2) {
                    $payments['municipal_services'] = 17064;
                }
                $payments['covid'] = 15000;
                break;
            case 4:
                if ($oneManFamilySalary < 7814) {
                    if ($this->familyInfo['children'][$childNumber]['activity'] == 2) {
                        $payments['monthly_children_payment_year'] = 6720;
                        $payments['monthly_children_payment_year_month'] = 560;
                        if ($this->getChildrenCount() >= 3) {
                            $payments['children_nutrition'] = 700 * 9;
                            $payments['children_nutrition_month'] = 700;
                        } else {
                            $payments['children_nutrition'] = 350 * 9;
                            $payments['children_nutrition_month'] = 350;
                        }
                    }
                }
                break;
            default:
                break;

        }
        return $payments;
    }

    private function getSocialPayment() {
        $socialPayment = 0;
        if ($this->getChildrenSchoolboyOrLess18() && $this->getFamilySalary() < 7814) {
            $socialPayment = 500;
        }
        return $socialPayment;
    }

    public function getPayments() : array {
        $this->childrenActivityNumber = 0;
        $this->childrenInactivityNumber = 0;
        $payments = [];
        $children = $this->familyInfo['children'];
        $oneManFamilySalary = $this->getFamilySalary();
        if (is_array($children)) {
            foreach ($children as $k => $child) {
                $payments[] = $this->getOneChildPayments($k, $oneManFamilySalary);
            }
        }

        $paymentsResult = [
            'monthly_children_payment_year' => 0,
            'monthly_children_payment_year_month' => 0,

            'monthly_children_birth_payment_year' => 0,
            'monthly_children_birth_payment_year_month' => 0,

            'municipal_services' => 0,

            'children_activity' => 0,
            'children_activity_month' => 0,

            'children_inactivity' => 0,
            'children_inactivity_month' => 0,

            'children_nutrition' => 0,
            'children_nutrition_month' => 0,

            'children_monthly' => 0,
            'children_monthly_month' => 0,

            'maternity_leave' => 0,
            'maternity_leave_month' => 0,

            'children_hc' => 0,
            'children_hc_month' => 0,

            'children_social_month' => 0,
            'children_social_month_month' => 0,

            'covid' => 0,
        ];
        foreach ($payments as $payment) {
            foreach ($payment as $k => $p) {
                $paymentsResult[$k] += $p;
            }
        }
        $childrenCount = $this->getChildrenCountLess18();
        if ($childrenCount >= 3) {
            $paymentsResult['children_hc'] = 1422*12;
            $paymentsResult['children_hc_month'] = 1422;
        }
        $paymentsResult['children_social_month'] = $this->getSocialPayment() * 12;
        $paymentsResult['children_social_month_month'] = $this->getSocialPayment();
        return $paymentsResult;
    }



}