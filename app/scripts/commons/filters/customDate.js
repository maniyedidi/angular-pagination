(function () {
    angular
        .module('angularPagination')
        .filter('customDate', function () {
            return function (text, current) {
                if (text !== undefined && text !== null) {
                     text = text.toString();
                     text = text.replace(/ *\[[^\]]*]/,"");
                     if(text.indexOf('T') === -1){
                        return moment.utc(text, 'x').format('hh:mm DD MMM YYYY');
                     }else{
                        return moment.utc(text);
                     }
                }else if (current === true){
                    return new Date();
                }
            };
        });
} ());
