<?php
header("Content-Type: image/svg+xml; charset=UTF-8");

$title = isset($_GET['title']) ? $_GET['title'] : 'SmartAffiliate';
$title = strip_tags($title);
$title = mb_substr($title, 0, 80);

function escape($text) {
    return htmlspecialchars($text, ENT_QUOTES | ENT_XML1, 'UTF-8');
}

$site = "SmartAffiliate";
$subtitle = "AI Tools, Automation & Affiliate Marketing";

$title = escape($title);
$site = escape($site);
$subtitle = escape($subtitle);

echo <<<SVG
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e3a8a"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#22c55e"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>

  <circle cx="1040" cy="120" r="140" fill="#ffffff" fill-opacity="0.05"/>
  <circle cx="140" cy="520" r="180" fill="#ffffff" fill-opacity="0.04"/>

  <rect x="70" y="70" width="180" height="14" rx="7" fill="url(#accent)"/>

  <text x="70" y="160"
        font-family="Arial, Tahoma, sans-serif"
        font-size="42"
        font-weight="700"
        fill="#93c5fd">
    {$site}
  </text>

  <foreignObject x="70" y="200" width="1060" height="250">
    <div xmlns="http://www.w3.org/1999/xhtml"
         style="font-family: Arial, Tahoma, sans-serif; color: white; font-size: 64px; font-weight: 700; line-height: 1.2;">
      {$title}
    </div>
  </foreignObject>

  <text x="70" y="540"
        font-family="Arial, Tahoma, sans-serif"
        font-size="30"
        fill="#cbd5e1">
    {$subtitle}
  </text>

  <rect x="70" y="570" width="320" height="8" rx="4" fill="url(#accent)"/>
</svg>
SVG;
?>
