!function(global){"use strict";function doImportScripts(msg){msg.scripts&&msg.scripts.length>0&&importScripts.apply(void 0,msg.scripts),postMessage({type:"importScripts"})}function newTask(msg){var CodecClass=global[msg.codecClass],sn=msg.sn;if(tasks[sn])throw Error("duplicated sn");tasks[sn]={codec:new CodecClass(msg.options),crcInput:"input"===msg.crcType,crcOutput:"output"===msg.crcType,crc:new Crc32},postMessage({type:"newTask",sn:sn})}function processData(msg){var sn=msg.sn,type=msg.type,input=msg.data,task=tasks[sn];!task&&msg.codecClass&&(newTask(msg),task=tasks[sn]);var output,isAppend="append"===type,start=now();if(isAppend)try{output=task.codec.append(input,function(loaded){postMessage({type:"progress",sn:sn,loaded:loaded})})}catch(e){throw delete tasks[sn],e}else delete tasks[sn],output=task.codec.flush();var codecTime=now()-start;start=now(),input&&task.crcInput&&task.crc.append(input),output&&task.crcOutput&&task.crc.append(output);var crcTime=now()-start,rmsg={type:type,sn:sn,codecTime:codecTime,crcTime:crcTime},transferables=[];output&&(rmsg.data=output,transferables.push(output.buffer)),isAppend||!task.crcInput&&!task.crcOutput||(rmsg.crc=task.crc.get());try{postMessage(rmsg,transferables)}catch(ex){postMessage(rmsg)}}function onError(type,sn,e){var msg={type:type,sn:sn,error:formatError(e)};postMessage(msg)}function formatError(e){return{message:e.message,stack:e.stack}}function Crc32(){this.crc=-1}function NOOP(){}if(global.zWorkerInitialized)throw new Error("z-worker.js should be run only once");global.zWorkerInitialized=!0,addEventListener("message",function(event){var message=event.data,type=message.type,sn=message.sn,handler=handlers[type];if(handler)try{handler(message)}catch(e){onError(type,sn,e)}});var handlers={importScripts:doImportScripts,newTask:newTask,append:processData,flush:processData},tasks={},now=global.performance?global.performance.now.bind(global.performance):Date.now;Crc32.prototype.append=function(data){for(var crc=0|this.crc,table=this.table,offset=0,len=0|data.length;len>offset;offset++)crc=crc>>>8^table[255&(crc^data[offset])];this.crc=crc},Crc32.prototype.get=function(){return~this.crc},Crc32.prototype.table=function(){var i,j,t,table=[];for(i=0;256>i;i++){for(t=i,j=0;8>j;j++)1&t?t=t>>>1^3988292384:t>>>=1;table[i]=t}return table}(),global.NOOP=NOOP,NOOP.prototype.append=function(bytes,onprogress){return bytes},NOOP.prototype.flush=function(){}}(this);