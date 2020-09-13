<?php
namespace App\Calculator;

abstract class Payments
{
    protected $familyInfo;

    public function __construct($familyInfo)
    {
        $familyInfo['car_power'] = isset($familyInfo['car_power']) ? str_replace(' ', '', $familyInfo['car_power']) : 0;
        $familyInfo['tax_estate'] = isset($familyInfo['tax_estate']) ? str_replace(' ', '', $familyInfo['tax_estate']) : 0;

        if (isset($familyInfo['children']) && !empty($familyInfo['children'])) {
            array_multisort(array_column($familyInfo['children'], 'age'), SORT_DESC, $familyInfo['children']);
        }

        $this->familyInfo = $familyInfo;
    }

    protected function getChildrenCount() : int {
        $childrenCount = 0;
        if (is_array($this->familyInfo['children'])) {
            $childrenCount = count($this->familyInfo['children']);
        }
        return $childrenCount;
    }

    protected function getChildrenCountLess18() : int {
        $childrenCount = 0;
        if (is_array($this->familyInfo['children'])) {
            foreach ($this->familyInfo['children'] as $child) {
                if ($child['age'] < 5) {
                    $childrenCount++;
                }
            }
        }
        return $childrenCount;
    }

    protected function getChildrenSchoolboy() : int {
        $childrenCount = 0;
        if (is_array($this->familyInfo['children'])) {
            foreach ($this->familyInfo['children'] as $child) {
                if ($child['activity'] == 2) {
                    $childrenCount++;
                }
            }
        }
        return $childrenCount;
    }

    protected function getChildrenSchoolboyOrLess18() : int {
        $childrenCount = 0;
        if (is_array($this->familyInfo['children'])) {
            foreach ($this->familyInfo['children'] as $child) {
                if ($child['activity'] == 2 || $child['age'] < 4) {
                    $childrenCount++;
                }
            }
        }
        return $childrenCount;
    }

    protected function getFamilySize() {
        $familySize = 1;
        foreach ($this->familyInfo as $k => $fI) {
            switch ($k) {
                case 'partner':
                    if (!empty($fI)) {
                        $familySize++;
                    }
                    break;
                case 'children':
                    if (!empty($fI)) {
                        $familySize += count($fI);
                    }
                    break;
                default:
                    break;
            }
        }
        return $familySize;
    }

    protected function getSalary() {
        $citizenSalary = str_replace(' ', '', $this->familyInfo['citizen']['salary']);
        if (empty($citizenSalary)) {
            $citizenSalary = 0;
        }
        $partnerSalary = 0;
        if (isset($this->familyInfo['partner'])) {
            $partnerSalary = str_replace(' ', '', $this->familyInfo['partner']['salary']);
            if (empty($partnerSalary)) {
                $partnerSalary = 0;
            }
        }
        return $citizenSalary + $partnerSalary;
    }

    protected function getFamilySalary() {
        $salaryForOneMan = $this->getSalary() / $this->getFamilySize();
        return $salaryForOneMan;
    }

    abstract public function getPayments() : array;



}