window.ju_num=(typeof window.ju_num==='undefined')?'6A43E5FA-3BCF-4BA8-83CD-54A5585E5330':window.ju_num;window.asset_host='//cdn.justuno.com/';(function(i,s,o,g,r,a,m){i['JustunoApp']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)};a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script',asset_host+'vck.js','juapp');if(triggermail.Partner.trackCheckout.toString().match(/\{([\s\S]*)\}/m)[1]!==""){var original_purchase=triggermail.purchase;triggermail.purchase=function(){original_purchase.apply(this,arguments);var order=arguments[0];juapp("order",order["order_id"],{total:order["total"]});};}else{function fireJustUnoConversion(){var pixel=document.getElementById("bluecore_purchase_pixel");if(!pixel){return false;}
var src=pixel.src;var order_id=triggermail.util.getParamFromQueryString(src,"order_id");if(order_id&&order_id!=="null"){var order_total=triggermail.util.getParamFromQueryString(src,"total");juapp("order",order_id,{total:order_total});return true;}
return false;}
function __checkPixel(counter){if(counter<=0){return;}
if(!window.juapp||!fireJustUnoConversion()){window.setTimeout(__checkPixel,300,counter-1);}}
__checkPixel(10);};function beforeFirewelcomeEmail(email,cmid,options,namespace){function valueValidator(values){return(typeof(values)!="undefined"&&values!=""&&values!=null)}
try{return(valueValidator(email)&&valueValidator(cmid)&&valueValidator(options.promo_options.bluecore_listId)&&valueValidator(namespace));}catch(e){return false;}}
function fireWelcomeEmail(email,cmid,options,customer_data){try{var namespace=triggermail.lytics.get_config('token');var requestTimeoutTime=2000;var newXHR=null;if(window.XMLHttpRequest){newXHR=new XMLHttpRequest();}else{newXHR=new ActiveXObject("Microsoft.XMLHTTP");}
if(beforeFirewelcomeEmail(email,cmid,options,namespace)){var timeoutTimer=0;newXHR.open('POST','https://api.bluecore.com/api/email/welcome_series/'+namespace);newXHR.setRequestHeader('Content-Type','application/x-www-form-urlencoded');newXHR.onreadystatechange=function(){if(this.readyState==4&&this.status==200){clearTimeout(timeoutTimer);}};var formData=window.btoa(JSON.stringify({partner:namespace,email:email,campaign_id:cmid,template_attributes:options,customer_attributes:customer_data}));timeoutTimer=setTimeout(function(){newXHR.abort();},requestTimeoutTime);newXHR.send("data="+formData);}}catch(e){return false;}}
window.ju_custom_event=function(email,eventname,promotitle,step,cmid,options,data){if(typeof(triggermail)==="undefined"){return;}
try{var list_name=(options.promo_options.bluecore_lists?options.promo_options.bluecore_lists:promotitle);var source="justuno";if(step==1){triggermail.custom("viewed_justuno_promo",{list_name:list_name,source:source})}
if(step==2){var customer_data={};if(data&&data.length){data.forEach(function(datum){var field=datum.name.replace(/ |-/g,"_").toLowerCase();if(customer_data[field]===undefined){customer_data[field]=datum.value;}else{customer_data[field]+=','+datum.value;}});}
var non_null_email=email||"";triggermail.custom("engaged_justuno_promo",{list_name:list_name,source:source,submitted_email:non_null_email,coupon_code:options.promo_coupon||""});if(non_null_email){fireWelcomeEmail(email,cmid,options,customer_data);triggermail.optin({email:non_null_email,source:source});triggermail.custom("welcome_qualifier",{source:source});triggermail.track("resubscribe",{source:source});}
if(data&&data.length-!!customer_data.coupon){delete customer_data.coupon;triggermail.customer_patch(customer_data);}}}catch(err){console.log("caught error trying to push to bluecore");}};