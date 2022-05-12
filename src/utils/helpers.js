const helpers = function() {

    return {

        urlify: function(text) {
            var urlRegex = /(https?:\/\/[^\s]+)/g;
            return text.replace(urlRegex, function(url) {
                return '<a href="' + url + '" target="_blank">' + url + '</a>';
            })
        },

        breakLine: function(text) {
            var breakRegex = /\n/g;
            return text.replace(breakRegex, '<br>');
        },
        

        beautifyTweet: function(text) {
            text = this.urlify(text);
            text = this.breakLine(text);
            
            return text;
        },

        isTokenAddressValidRegex: function(address) {
            return address.match(/^0x[a-fA-F0-9]{40}$/g);
        },

    }

}();

export default helpers;