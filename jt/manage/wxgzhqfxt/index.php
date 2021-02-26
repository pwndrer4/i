<?php
require_once('../../system/common.inc.php');
$packages = DB::fetch_all("SELECT `ID`, `Name`,`Icon2`, `Section`, `SectionID`, `Description`,`DownloadTimes`,`Package` FROM `".DCRM_CON_PREFIX."Packages` WHERE (`Stat` = '1') ORDER BY `CreateStamp` DESC LIMIT 1");
foreach($packages as $package) {
  $package=$package['Name'];   }
$packages2 = DB::fetch_all("SELECT `ID`, `Name`,`Icon2`, `Section`, `SectionID`, `Description`,`DownloadTimes`,`Package` FROM `".DCRM_CON_PREFIX."Packages` WHERE (`Stat` = '1') ORDER BY `CreateStamp` DESC LIMIT 2");
foreach($packages2 as $package2) {
  $package2=$package2['Name'];   }     
$packages3 = DB::fetch_all("SELECT `ID`, `Name`,`Icon2`, `Section`, `SectionID`, `Description`,`DownloadTimes`,`Package` FROM `".DCRM_CON_PREFIX."Packages` WHERE (`Stat` = '1') ORDER BY `CreateStamp` DESC LIMIT 3");
foreach($packages3 as $package3) {
  $package3=$package3['Name'];   } 
$packages4 = DB::fetch_all("SELECT `ID`, `Name`,`Icon2`, `Section`, `SectionID`, `Description`,`DownloadTimes`,`Package` FROM `".DCRM_CON_PREFIX."Packages` WHERE (`Stat` = '1') ORDER BY `CreateStamp` DESC LIMIT 4");
foreach($packages4 as $package4) {
  $package4=$package4['Name'];   } 
$packages5 = DB::fetch_all("SELECT `ID`, `Name`,`Icon2`, `Section`, `SectionID`, `Description`,`DownloadTimes`,`Package` FROM `".DCRM_CON_PREFIX."Packages` WHERE (`Stat` = '1') ORDER BY `CreateStamp` DESC LIMIT 5");
foreach($packages5 as $package5) {
  $package5=$package5['Name'];   }  

 $appid = "wx29a319cb72708fd0";
 //$appsecret = "73caad0430ee145ebaa37f6a517cf84f";
 $times= date('y年m月d日 H:i:s',time());
echo "<p>群发时间：'".$times."'</p></br>"; 
$url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=".$appid."&secret=".$appsecret;//取得token
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$output = curl_exec($ch);
curl_close($ch);
$jsoninfo = json_decode($output, true);
$access_token = $jsoninfo["access_token"];
// echo $access_token."</br>";
 
$begin=0;
if($begin>=10000)
{$url= "https://api.weixin.qq.com/cgi-bin/user/get?access_token=".$access_token."&next_openid=".$_GET['next_openid'];}
else{$url= "https://api.weixin.qq.com/cgi-bin/user/get?access_token=".$access_token; }
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$output = curl_exec($ch);
curl_close($ch);
$array = json_decode($output, true);
echo $array["count"]."</br>";
 foreach ($array["data"]["openid"] as $key=>&$value) {//获取用户的唯一标识
     echo ($key)."->".$value."</br>" ;
// } //群发注释
 
$times= date('y年m月d日 H:i:s',time());
$template = array('touser' =>"$value",//&, // //
    'template_id' => "lrORyYOTjfToYb6ATurb4C2kSUXp7vYYUza8o7rRAd8",
    'url' => "https://apt.um5.net/gxtz.php",
    'topcolor' => "#7B68EE",
    'data' => array('first'    => array('value' => urlencode("有名源中文网插件更新通知"),
        'color' => "#743A3A",
    ),
        'keyword1' => array('value' => urlencode("尊敬的有名源中文网用户！本次更新的插件是以下几款\\n$package\\n$package2\\n$package3\\n$package4\\n$package5\\n等一系列插件！详细请点击详情查看！"),
            'color' => "#FF0000",
        ),
        'keyword2'     => array('value' => urlencode($times),
            'color' => "#C4C400",
        ),
        'remark'     => array('value' => urlencode("感谢您使用有名源中文网！祝您生活愉快!"),
            'color' => "#008000",
        ),
 
    )
);
 var_dump($template)."</br>";
 echo urldecode(json_encode($template))."</br>";
$url = "https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=".$access_token;
$result = https_request($url, urldecode(json_encode($template)));//"";//群发命令
 var_dump($result)."</br>";
 } //群发关闭
function https_request($url,$data = null){
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
    if (!empty($data)){
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
    }
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $output = curl_exec($curl);
    curl_close($curl);
   //  echo "</br>";
//     echo $output;
    return $output;
}

?>    

