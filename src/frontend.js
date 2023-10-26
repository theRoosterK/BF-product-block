import '@accessible360/accessible-slick';

jQuery(document).ready(function($) {
	$( '.wp-block-bikefinder-product .carousel' ).slick({
		arrows: true,
		dots: true,
		initialSlide: 0,
		autoplay: true,
		autoplaySpeed: 12000
	});

	$( 'document' ).on( 'click', '#primary-product-purchase-button', function() {
		// Actually add the product to cart
		var page_lang = document.getElementsByTagName('html')[0].getAttribute('lang');

		if (page_lang == 'de-DE') {
			$.ajax({
				type: "POST",
				url: "/?wc-ajax=add_to_cart",
				data: {product_id: 185613, quantity: 1},
				success: function (res) {
					$(document.body).trigger("wc_fragment_refresh") // Refresh cart
				}
			})
		} else {
			$.ajax({
				type: "POST",
				url: "/?wc-ajax=add_to_cart",
				data: {product_id: 127, quantity: 1},
				success: function (res) {
					$(document.body).trigger("wc_fragment_refresh") // Refresh cart
				}
			})
		}

		// This is a hook to let others know that we added to cart
		$(document.body).trigger("adding_to_cart", [])
	} );
});
