<?php

// Obtained from freesound.org OAuth API token generation
$ACCESS_TOKEN = 'ef1319589680a65c57404314ef7b1a8e0580078e';

error_reporting(0);

function json_err($msg) {
	header('Content-type: application/json');
	die(json_encode(array('error' => $msg)));
}

function sound_query($path, $query='') {
	global $ACCESS_TOKEN;
	$end = '/';

	if ($query !== '') {
		$end .= '?query='.urlencode($query);
	}

	$crl = curl_init('https://www.freesound.org/apiv2'.$path.$end);

	$headr = array(
		'Content-length: 0',
		'Content-type: application/json',
		'Authorization: Bearer '.$ACCESS_TOKEN
	);

	curl_setopt($crl, CURLOPT_HTTPHEADER, $headr);
	curl_setopt($crl, CURLOPT_TIMEOUT, 60);

	if ($query !== '') {
		curl_setopt($crl, CURLOPT_RETURNTRANSFER, 1);
	}

	$rest = curl_exec($crl);

	if ($rest === false) {
		json_err(curl_error($crl));
	}

	curl_close($crl);

	return $rest;
}

if (isset($_GET['q']) && $_GET['q'] !== '') {
	$r = sound_query('/search/text', $_GET['q']);

	if ($r) {
		$json = json_decode($r, true);

		header('Content-type: audio/wav; codecs="1"');
		sound_query('/sounds/'.$json['results'][0]['id'].'/download');
		die();
	}

	json_err('search failed');
}

json_err('no query');
?>
