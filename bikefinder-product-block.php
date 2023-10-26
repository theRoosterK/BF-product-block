<?php
/**
 * Plugin Name: BikeFinder Product Block
 * Description: Blocks for BikeFinder Products
 */

namespace BikeFinder\Plugins\Blocks\Product;

function register_block() {
	\register_block_type(
		__DIR__ . '/build/block.json',
	);
}
\add_action( 'init', __NAMESPACE__ . '\\register_block' );
