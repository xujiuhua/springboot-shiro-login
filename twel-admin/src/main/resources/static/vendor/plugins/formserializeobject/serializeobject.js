/**
 *
 * @author BOGON
 * @version 1.0
 */
(function($){
    $.fn.extend({
        serializeObject:function(){
            if(this.length>1){
                return false;
            }
            var arr=this.serializeArray();
            var obj=new Object;
            $.each(arr,function(k,v){
                obj[v.name]=v.value;
            });
            return obj;
        }
    });
})(jQuery);
/**
 * @author gaohuia
 */

(function($){
    $.fn.extend({
        serializeObject:function(){
            if(this.length>1){
                return false;
            }
            var arr=this.serializeArray();
            var obj=new Object;
            $.each(arr,function(k,v){
                obj[v.name]=v.value;
            });
            return obj;
        }
    });
})(jQuery);