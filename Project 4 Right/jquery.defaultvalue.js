/**
 * Legt ein Default-Value fuer eine Textbox fest.
 * Wird auf die Textbox geklickt, die den Default-Value enthaelt, wird dieser aus der 
 * Textbox geloescht. Wird die Textbox ohne Eingabe verlassen, wird der Inhalt wieder
 * auf den Default-Value zurueckgesetzt.
 *
 * @param value string Default-Wert der Textbox
 * @param options Object
 *                  - class : CSS-Klasse der Textbox die den Default-Value enthaelt
 *
 * @version 1.0
 */
$.fn.setDefaultValue = function(options)
{
    var options = $.extend(
    						{ 
								css : 'txt_default'
							}, options);
    
    return this.each(function()
    {
        var $this = $(this);
        
        var value = $this.attr('title');
        
        $(this).attr('autocomplete','off');
        
        if($this.val().length <= 0 || $this.val() == value)
        {
            $this.addClass(options.css);
            $this.val(value);
        }
        
        $this.click(clear);
        
        $this.blur(fill);
        
        $this.focus(clear).blur();
        
        function clear()
        {
            if($this.hasClass(options.css) || $this.val() == value)
            {
                $this.val('');
                $this.removeClass(options.css);
            }
        }
        
        function fill()
        {
            if($this.val().length <= 0)
            {
                $this.addClass(options.css);
                $this.val(value);
            }
        }
        $(window).unload(clear); // Firefox-Autocomplete
    });  
};