# Gowild.SG Website
This repository contains all the files used to host <a href="http://gowild.sg/">gowild.sg</a>.

<h2>Developer Instructions</h2>
<p> 
 <ol>
    <li>Download and install <a href="http://www.aptana.com/products/studio3/download">Aptana Studio 3.6.1</a> or versions above it. If an error occurs during the installation of Aptana Studio, look at this <a href="http://stackoverflow.com/questions/33398769/failed-to-correctly-acquire-intaller-nodejs-windows-msi-file-crc-error">page</a> to see if you can resolve it.</li>
    <li>Download and install <a href="http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html">Java SE Development Kit 8u112</a> and make sure its the x86 version.</li>
    <li>If an FTP manager is required, you can use <a href="https://filezilla-project.org/">FileZila</a> otherwise, you can upload the files for the website through cPanel's own FTP manager or using configuring the FTP manager in Aptana itself.</li>
  </ol>
</p>
<h2>3rd Party Libraries/Dependencies</h2>
Below are the list of dependencies/libraries that are being used for the website.
<ol>
  <li>Swiper 3.2.7</li>
  <li>Bootstrap 3.3.6</li>
  <li>animate.css 3.5.1</li>
  <li>Ionic 1.3.1</li>
  <li>jQuery</li>
  <li>html5shiv</li>
</ol>
<h2>Architecture</h2>
The website uses `html5` and follows the `bootstrap` theme by using its stylesheet. <br>
Excluding the homepage, there are 8 subpages in the website:
<p>
 <ol>
  <li>GongZi.XiaoBai</li>
  <li>GongZi.XiaoBai Smart Plus</li>
  <li>Mini GongZi.XiaoBai</li>
  <li>Support</li>
  <li>Support-Technical</li>
  <li>Support-How-to</li>
  <li>Support-After Sales</li>
  <li>About Us</li>
 </ol>
</p>
 The mobile webpage is a seperate entity and has its own seperate content that needs to be updated seperately. <br>
 Starting from the `dash.html` homepage, it has:
<p> 
 <ol>
  <li>GongZi.XiaoBai</li>
  <li>GongZi.XiaoBai Smart Plus</li>
  <li>Mini GongZi.XiaoBai</li>
  <li>Mini GongZi.XiaoBai Celebrity Version</li>
  <li>Support(list.html)</li>
  <li>Support-GongZi.XiaoBai</li>
  <li>Support-Mini GongZi.XiaoBai</li>
  <li>Support-Downloads</li>
  <li>News(loads external .php content)</li>
  <li>About Us</li>
  <li>WiFi QR Code Generator</li>
 </ol>
</p>
For the main website, all pages use the stylesheets from `base.css` and `site.css` located in the `css` folder.
Only 2 pages, GongZi.XiaoBai and Mini GongZi.XiaoBai, do not use the same `site.css` and use their own stylesheets which are
`gzxb.css` and `gwais.css` respectively.

