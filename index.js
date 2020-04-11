(function () {var a={props:["backup","downloading"]};if(typeof a==="function"){a=a.options}Object.assign(a,function(){var render=function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c("li",{staticClass:"backup-entry"},[_c("div",{staticClass:"backup-filename"},[_c("k-icon",{attrs:{"type":"backup"}}),_vm._v(" "),_c("span",[_vm._v(_vm._s(_vm.backup.filename))])],1),_vm._v(" "),_c("div",{staticClass:"backup-size"},[_vm._v(_vm._s(_vm.backup.size))]),_vm._v(" "),_c("div",{staticClass:"backup-date"},[_vm._v(_vm._s(_vm.backup.date))]),_vm._v(" "),_c("div",{staticClass:"backup-actions"},[!_vm.downloading?_c("k-button",{staticClass:"backup-download",attrs:{"icon":"download"},on:{"click":function($event){return _vm.$emit("download",_vm.backup.filename)}}},[_vm._v(_vm._s(_vm.$t("backups.download")))]):_c("k-button",{staticClass:"backup-download",attrs:{"icon":"backupsLoader","disabled":true}},[_vm._v(_vm._s(_vm.$t("backups.downloading")))]),_vm._v(" "),_c("k-button",{attrs:{"icon":"trash","theme":"negative"},on:{"click":function($event){return _vm.$emit("delete")}}})],1)])};var staticRenderFns=[];return{render:render,staticRenderFns:staticRenderFns,_compiled:true,_scopeId:null,functional:undefined}}());var b={data:function(){return{backup:null}},computed:{filename:function(){return this.backup?this.backup.filename:""}},methods:{open:function(e){this.backup=e,this.$refs.dialog.open()},resetBackup:function(){this.backup=null},deleteBackup:function(){var e=this;this.$api.post("backups/delete-backup",{filename:this.backup.filename}).then(function(t){t.deleted&&e.$emit("deleted",e.backup.filename),e.$refs.dialog.close()})}}};if(typeof b==="function"){b=b.options}Object.assign(b,function(){var render=function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c("k-dialog",{ref:"dialog",attrs:{"size":"medium","theme":"negative","icon":"trash","button":_vm.$t("backups.delete.button")},on:{"close":_vm.resetBackup,"cancel":_vm.resetBackup,"submit":_vm.deleteBackup}},[_c("k-text",[_vm._v(" "+_vm._s(_vm.$t("backups.delete.prefix"))+" "),_c("strong",[_vm._v(_vm._s(_vm.filename))])])],1)};var staticRenderFns=[];return{render:render,staticRenderFns:staticRenderFns,_compiled:true,_scopeId:null,functional:undefined}}());var c={data:function(){return{status:"closed",warning:"",toDelete:0,value:{period:null},fields:{period:{label:this.$t("backups.delete.multiple.question"),type:"select",placeholder:this.$t("backups.delete.multiple.placeholder"),options:[{value:"week",text:this.$t("backups.delete.multiple.week")},{value:"month",text:this.$t("backups.delete.multiple.month")},{value:"half",text:this.$t("backups.delete.multiple.half")},{value:"year",text:this.$t("backups.delete.multiple.year")}]}}}},props:{backups:Object},computed:{hasWarning:function(){return"warning"==this.status&&this.warning.length},loadingSimulation:function(){return"warning"==this.status&&!this.hasWarning},canDelete:function(){return this.hasWarning&&this.toDelete>0}},methods:{open:function(){this.resetValue(),this.status="open",this.$refs.dialog.open()},onPeriodChange:function(){this.value.period&&this.value.period.length?this.simulate():this.status="open"},simulate:function(){var e=this;this.status="warning",this.warning="",this.$api.get("backups/simulate-deletion",{period:this.value.period}).then(function(t){e.warning=t.toDelete.text,e.toDelete=t.toDelete.count})},deleteBackups:function(){var e=this;this.$api.post("backups/delete-backups",{period:this.value.period}).then(function(t){e.$emit("deleted",t.deleted),e.$refs.dialog.close()})},resetValue:function(){this.value={period:null},this.warning=""}}};if(typeof c==="function"){c=c.options}Object.assign(c,function(){var render=function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c("k-dialog",{ref:"dialog",class:["backups-delete-dialog",{"can-delete":_vm.canDelete}],attrs:{"button":_vm.$t("backups.delete.multiple.button"),"theme":"negative","icon":"trash","size":"medium"},on:{"submit":_vm.deleteBackups}},[_c("k-form",{ref:"form",attrs:{"fields":_vm.fields},on:{"input":_vm.onPeriodChange},model:{value:_vm.value,callback:function($$v){_vm.value=$$v},expression:"value"}}),_vm._v(" "),_vm.hasWarning?_c("k-box",{attrs:{"theme":"info"}},[_c("k-text",{domProps:{"innerHTML":_vm._s(_vm.warning)}})],1):_vm.loadingSimulation?_c("div",{staticClass:"warning-loading"},[_c("k-icon",{attrs:{"type":"backupsLoader"}})],1):_vm._e()],1)};var staticRenderFns=[];return{render:render,staticRenderFns:staticRenderFns,_compiled:true,_scopeId:null,functional:undefined}}());var d={components:{"backup-entry":a,"backup-delete-dialog":b,"backups-delete-dialog":c},data:function(){return{backups:[],listLoading:!0,downloading:!1,creationStatus:"default"}},mounted:function(){this.getBackups(),window.beforeunload=this.deletePublicBackups()},destroyed:function(){this.deletePublicBackups()},methods:{getBackups:function(){var e=this;this.$api.get("backups/get-backups-list").then(function(t){e.backups=t,e.listLoading=!1})},deletePublicBackups:function(){this.$api.post("backups/delete-public-backups")},createBackup:function(){var e=this;this.creationStatus="progress",this.$api.get("plugin-janitor/backupZip").then(function(t){if(e.setCreationStatus(t.status,!0),200==t.status){var i={filename:t.filename+".zip",size:t.nicesize,date:t.modified};e.backups.unshift(i)}}).catch(function(t){e.setCreationStatus("error",!0)})},setCreationStatus:function(e){var t=this,i=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];this.creationStatus=200==e?"success":"error",i&&setTimeout(function(){t.creationStatus="default"},2e3)},copyAndDownload:function(e){var t=this;this.downloading=e,e="latest"==e?this.backups[0].filename:e,this.$api.get("backups/copy-to-assets",{filename:e}).then(function(e){e.url&&(window.location=e.url),t.downloading=!1})},openBackupDeleteDialog:function(e){this.$refs["backup-delete"].open(e)},onBackupDeleted:function(e){this.backups=this.backups.filter(function(t){return t.filename!==e})},openBackupsDeleteDialog:function(){this.$refs["backups-delete"].open()},onBackupsDeleted:function(e){this.backups=this.backups.filter(function(t){return!e.includes(t.filename)})}}};if(typeof d==="function"){d=d.options}Object.assign(d,function(){var render=function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c("k-view",{staticClass:"k-backups-view"},[_c("k-header",{staticClass:"k-backups-view-header"},[_vm.listLoading?_c("span",[_vm._v(_vm._s(_vm.$t("view.backups")))]):_c("span",[_vm._v(_vm._s(_vm.backups.length)+" "+_vm._s(_vm.$t("backups.pluralized",{},_vm.backups.length)))]),_vm._v(" "),_c("k-button-group",{attrs:{"slot":"left"},slot:"left"},[_vm.creationStatus=="default"?_c("k-button",{attrs:{"icon":"add"},on:{"click":_vm.createBackup}},[_vm._v(_vm._s(_vm.$t("backups.create")))]):_vm.creationStatus=="progress"?_c("k-button",{attrs:{"icon":"backupsLoader","disabled":true}},[_vm._v(_vm._s(_vm.$t("backups.create.process")))]):_vm.creationStatus=="success"?_c("k-button",{attrs:{"icon":"check","disabled":true,"theme":"positive"}},[_vm._v(_vm._s(_vm.$t("backups.create.success")))]):_vm.creationStatus=="error"?_c("k-button",{attrs:{"icon":"alert","disabled":true,"theme":"negative"}},[_vm._v(_vm._s(_vm.$t("backups.create.error")))]):_vm._e()],1),_vm._v(" "),_vm.backups.length?_c("k-button-group",{attrs:{"slot":"right"},slot:"right"},[_vm.downloading!=="latest"?_c("k-button",{attrs:{"icon":"download"},on:{"click":function($event){return _vm.copyAndDownload("latest")}}},[_vm._v(_vm._s(_vm.$t("backups.download.latest")))]):_c("k-button",{attrs:{"icon":"backupsLoader","disabled":true}},[_vm._v(_vm._s(_vm.$t("backups.downloading")))]),_vm._v(" "),_c("k-button",{attrs:{"icon":"trash"},on:{"click":_vm.openBackupsDeleteDialog}},[_vm._v(_vm._s(_vm.$t("backups.delete.some")))])],1):_vm._e()],1),_vm._v(" "),_vm.backups.length?_c("section",{staticClass:"backups-section"},[_c("header",{staticClass:"backups-header"},[_c("div",{staticClass:"backup-filename"},[_vm._v(_vm._s(_vm.$t("backups.filename")))]),_vm._v(" "),_c("div",{staticClass:"backup-size"},[_vm._v(_vm._s(_vm.$t("backups.size")))]),_vm._v(" "),_c("div",{staticClass:"backup-date"},[_vm._v(_vm._s(_vm.$t("backups.created")))])]),_vm._v(" "),_c("ul",{staticClass:"backups-list"},_vm._l(_vm.backups,function(backup){return _c("backup-entry",{key:backup.filename,attrs:{"backup":backup,"downloading":_vm.downloading==backup.filename},on:{"download":_vm.copyAndDownload,"delete":function($event){return _vm.openBackupDeleteDialog(backup)}}})}),1)]):_c("div",{staticClass:"backups-placeholder"},[_vm.listLoading?_c("div",{staticClass:"backups-placeholder-loader"},[_c("k-icon",{attrs:{"type":"backupsLoader"}})],1):_c("div",{staticClass:"backups-placeholder-empty"},[_vm._v(_vm._s(_vm.$t("backups.placeholder")))])]),_vm._v(" "),_c("backup-delete-dialog",{ref:"backup-delete",on:{"deleted":_vm.onBackupDeleted}}),_vm._v(" "),_c("backups-delete-dialog",{ref:"backups-delete",attrs:{"backups":_vm.backups},on:{"deleted":_vm.onBackupsDeleted}})],1)};var staticRenderFns=[];return{render:render,staticRenderFns:staticRenderFns,_compiled:true,_scopeId:null,functional:undefined}}());panel.plugin("sylvainjule/backups",{views:{backups:{icon:"backups",component:d}},icons:{backups:"<path d=\"M15.33,6.67H.67A.67.67,0,0,1,0,6V.67A.67.67,0,0,1,.67,0H15.33A.67.67,0,0,1,16,.67V6A.67.67,0,0,1,15.33,6.67Zm-14-1.33H14.67v-4H1.33Zm14,9.33H.67A.67.67,0,0,1,0,14V8.67A.67.67,0,0,1,.67,8H15.33a.67.67,0,0,1,.67.67V14A.67.67,0,0,1,15.33,14.67Zm-14-1.33H14.67v-4H1.33Zm5.33-10A.67.67,0,0,0,6,2.67H3.33A.67.67,0,0,0,3.33,4H6A.67.67,0,0,0,6.67,3.33Zm0,8A.67.67,0,0,0,6,10.67H3.33a.67.67,0,0,0,0,1.33H6A.67.67,0,0,0,6.67,11.33Zm6-8.67a.67.67,0,1,1-.67.67A.67.67,0,0,1,12.67,2.67Zm0,8a.67.67,0,1,1-.67.67A.67.67,0,0,1,12.67,10.67Z\"/>",backup:"<path d=\"M7.12,11.86a.56.56,0,0,1-.4-.16l-2-2a.56.56,0,0,1,.79-.79L7.12,10.5l3.56-3.56a.56.56,0,0,1,.79.79l-4,4A.56.56,0,0,1,7.12,11.86Z\"/><path d=\"M14,15.45H2.17A2.17,2.17,0,0,1,0,13.28V1.41A.69.69,0,0,1,.69.72H6.13a.69.69,0,0,1,.59.33L8,3.19h7.52a.69.69,0,0,1,.69.69v9.4A2.17,2.17,0,0,1,14,15.45ZM1.38,2.1V13.28a.8.8,0,0,0,.79.79H14a.8.8,0,0,0,.8-.79V4.57H7.61A.69.69,0,0,1,7,4.23L5.74,2.1Z\"/>",backupsLoader:"<g fill=\"none\" fill-rule=\"evenodd\"><g transform=\"translate(1 1)\" stroke-width=\"1.75\"><circle cx=\"7\" cy=\"7\" r=\"7.2\" stroke=\"#000\" stroke-opacity=\".2\"/><path d=\"M14.2,7c0-4-3.2-7.2-7.2-7.2\" stroke=\"#000\"><animateTransform attributeName=\"transform\" type=\"rotate\" from=\"0 7 7\" to=\"360 7 7\" dur=\"1s\" repeatCount=\"indefinite\"/></path></g></g>"}});})();