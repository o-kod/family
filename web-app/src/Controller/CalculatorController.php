<?php
namespace App\Controller;

use App\Calculator\ChildrenPayments;
use App\Calculator\ChildrenPaymentsOnce;
use App\Calculator\EducationPayments;
use App\Calculator\FamilyPayments;
use App\Calculator\HealthcarePayments;
use App\Calculator\LaborPayments;
use App\Calculator\TaxPayments;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CalculatorController extends AbstractController
{
    /**
     * @Route("/calculate", name="app_calculate")
     */
    public function index(): Response
    {
        $request = Request::createFromGlobals();

        $inputArray = [
            'citizen' => $request->get('citizen'),
            'partner' => $request->get('partner'),
            'children' => $request->get('children'),
            'is_student' => $request->get('is_student'),
            'is_disabled' => $request->get('is_disabled'),
            'is_child_disabled' => $request->get('is_child_disabled'),
            'is_veteran' => $request->get('is_veteran'),
            'is_war_veteran' => $request->get('is_war_veteran'),
            'is_so_veteran' => $request->get('is_so_veteran'),
            'is_retired' => $request->get('is_retired'),
            'tax_estate' => $request->get('tax_estate'),
            'car_power' => $request->get('car_power'),
            'twins' => $request->get('twins'),
        ];

        $cp = new ChildrenPayments($inputArray);
        $a = $cp->getPayments();

        $fp = new FamilyPayments($inputArray);
        $b = $fp->getPayments();

        $ep = new EducationPayments($inputArray);
        $c = $ep->getPayments();

        $hp = new HealthcarePayments($inputArray);
        $d = $hp->getPayments();

        $lp = new LaborPayments($inputArray);
        $e = $lp->getPayments();

        $po = new ChildrenPaymentsOnce($inputArray);
        $f = $po->getPayments();

        $taxes = new TaxPayments($inputArray);
        $t = $taxes->getPayments();


        $resultArray = array_merge($a, $b, $c, $d, $e, $f, $t);
        return new JsonResponse($resultArray);
    }

}