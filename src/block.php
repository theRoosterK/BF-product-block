<div <?php echo \get_block_wrapper_attributes() ?>>
	<div class="bikefinder-block-section">
		<div class="carousel">
			<?php foreach ( $attributes['images'] as $image ) : ?>
				<div>
					<?php echo \wp_get_attachment_image( $image, 'large' ); ?>
				</div>
			<?php endforeach; ?>
		</div>

		<div class="terms">
			<span>
				<?php \esc_html_e( '30 dagers åpent kjøp', 'bikefinder-product-block' ); ?>
			</span>
		</div>
	</div>

	<div class="bikefinder-block-section meta">
		<span>BikeFinder</span>
		<h1 class="wp-block-heading">
			<?php echo \esc_html( $attributes['title'] ); ?>
		</h1>

		<?php if ( $attributes['showReviews'] ) : ?>
			<div class="reviews">
				<span>
					<?php
						printf(
							// translators: %d is the number of reviews
							\esc_html__( '%d reviews', 'bikefinder-product-block' ),
							$attributes['reviews']
						)
					?>
				</span>

				<div itemtype="https://schema.org/Rating" itemscope itemprop="reviewRating" title="<?php echo \esc_attr( $attributes['rating'] ); ?>/5">
					<?php
					$stars = \floor( $attributes['rating'] );
					$hasHalf = $attributes['rating'] - $stars > 0;
					$emptyStars = 5 - $stars - ( $hasHalf ? 1 : 0 );

					for ( $i = 0; $i < $stars; $i++ ) {
						echo '<span class="rating filled">☆</span>';
					}
					if ( $hasHalf ) {
						echo '<span class="rating partial">☆</span>';
					}
					for ( $i = 0; $i < $emptyStars; $i++ ) {
						echo '<span class="rating empty">☆</span>';
					}
					?>
				</div>
			</div>
		<?php endif; ?>

		<div class="price-meta">
			<span class="price"><?php echo \esc_html( $attributes['price'] ); ?></span> <span class="extras"><?php \esc_html_e( '+ abonnement (inkluderer forsikring)', 'bikefinder-product-block' ); ?></span>

			<?php if ( $attributes['inStock'] ) : ?>
				<div class="stock">
					<?php \esc_html_e( 'På lager!', 'bikefinder-product-block' ); ?>
				</div>
			<?php endif; ?>
		</div>

		<div class="actions">
			<button id="primary-product-purchase-button" type="button" class="button primary" onclick="onBuyButtonPressed(true)">
				<?php echo \esc_html( $attributes['primaryButtonText'] ) ?>
			</button>

			<div class="secondary">
				<span>
					<?php \esc_html_e( 'For deg som allerede har sporingsenhet', 'bikefinder-product-block' ); ?>
				</span>

				<?php foreach ( $attributes['secondaryButtons'] as $button ) : ?>
					<a href="<?php echo \esc_url( $button['link'] ); ?>" class="button">
						<?php echo \esc_html( $button['label'] ); ?>
					</a>
				<?php endforeach; ?>
			</div>
		</div>

		<div class="payment-methods">
			<?php include __DIR__ . '/../assets/payment.svg'; ?>
		</div>
	</div>
</div>
