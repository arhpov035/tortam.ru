<?php
/* @var modResource $modx */
// Откликаться будет ТОЛЬКО на ajax запросы xxx
if (empty($_SERVER['HTTP_X_REQUESTED_WITH']) || $_SERVER['HTTP_X_REQUESTED_WITH'] != 'XMLHttpRequest') {
    return;
}

// Сниппет будет обрабатывать не один вид запросов, поэтому работать будем по запрашиваемому действию
// Если в массиве POST нет действия - выход


switch ($_POST['request']) {
    case "request_add_cooment":
        $response = $modx->runProcessor('resource/create', array(
            'pagetitle' => $_POST['name'],
            'longtitle' => '',
            'description' => '',
            'introtext' => '',
            'content' => $_POST['comment'],
            'template' => 3,
            'published' => 1,
            'parent' => 13,
            'tv3' => '/assets/img/img-25jpg',
            'tv4' => $_POST['id_product']
        ));
        if ($response->isError()) {
            return $modx->error->failure($response->getMessage());
        }
        //получаем в качестве объекта вновь созданную страницу
        $newResource = $response->response['object'];
        die();
    case "request_get_filling":
        if (empty($_POST['id'])) {
            return;
        }

        $id = $_POST['id'];
        // А если есть - работаем
        $res = $modx->getObject('modResource', $id);

        $where = array('parent' => 8); // id родителя
        $resources = $modx->getCollection('modResource', $where);
        $arFillings = array();
        $arFilling = array();

        foreach ($resources as $item) {
            $arFilling['id'] = $item->get('id');
            $arFilling['pagetitle'] = $item->get('pagetitle');
            array_push($arFillings, $arFilling);
        }

        $result = array(
                "pagetitle" => $res->get('pagetitle'),
                "image" => $res->getTVValue('image'),
                "content" => $res->get('content'),
                "arFillings" => $arFillings
        );

        exit(json_encode($result));

        // Если у нас есть, что отдать на запрос - отдаем и прерываем работу парсера MODX
        if (!empty($res)) {
            die($res);
        }
}