<template>
    <footer class="app_footer">
   
     <!-- 其它 -->
     <div class="extra">
       
         <!-- 版权信息 -->
         <div class="copyright">
           <p>
             <a href="javascript:;">关于我们</a>
             <a href="javascript:;">帮助中心</a>
             <a href="javascript:;">售后服务</a>
             <a href="javascript:;">配送与验收</a>
             <a href="javascript:;">商务合作</a>
             <a href="javascript:;">友情链接</a>
           </p>
           <p>@软件2201/2202</p>
         </div>
     </div>
   </footer>
 </template>
   
   <style scoped lang='scss'>
   .app_footer {
     overflow: hidden;
     background-color: #f5f5f5;
     /*padding-top: 500px;*/
     /*这里改了一下距离页面底部的距离*/
     padding-top: 10px;
   
   
     .extra {
       background-color: #333;
     }
   
   
     .copyright {
       height: 170px;
       padding-top: 40px;
       text-align: center;
       color: #999;
       font-size: 15px;
   
       p {
         line-height: 1;
         margin-bottom: 20px;
       }
   
       a {
         color: #999;
         line-height: 1;
         padding: 0 10px;
         border-right: 1px solid #999;
   
         &:last-child {
           border-right: none;
         }
       }
     }
   }
   </style>