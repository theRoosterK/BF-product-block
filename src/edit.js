import React from 'react';
import { MediaUpload, MediaUploadCheck, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import ServerSideRender from '@wordpress/server-side-render';
import { __ } from '@wordpress/i18n';

export default function save({ attributes, setAttributes, isSelected }) {
	const blockProps = useBlockProps();
	const {
		title,
		price,
		inStock,
		showReviews,
		rating,
		reviews,
		images,
		primaryButtonText,
		primaryButtonLink,
		secondaryButtons
	} = attributes;

	const chosenImages = useSelect( ( select ) => {
		const imageObjects = [];

		images.forEach( ( id ) => {
			const img = select( 'core' ).getMedia( id );
			if ( img ) {
				imageObjects.push( img );
			}
		});

		return imageObjects;
	} );

	const isFloatValue = ( value ) => {
		// Check that `value` is a valid integer, but allow decimals.
		return ! ( isNaN( value ) || value.trim() === '' );
	}

	return (
		<div { ...blockProps }>
			{ isSelected &&
				<InspectorControls>
					<PanelBody title="Settings">
						<TextControl
							label={ __( 'Product title', 'bikefinder-product-block' ) }
							value={ title }
							onChange={ ( value ) => setAttributes( { title: value } ) }
						/>

						<TextControl
							label={ __( 'Price', 'bikefinder-product-block' ) }
							value={ price }
							onChange={ ( value ) => setAttributes( { price: value } ) }
						/>

						<ToggleControl
							label={ __( 'In stock', 'bikefinder-product-block' ) }
							checked={ inStock }
							onChange={ ( value ) => setAttributes( { inStock: value } ) }
						/>

						<ToggleControl
							label={ __( 'Show reviews', 'bikefinder-product-block' ) }
							checked={ showReviews }
							onChange={ ( value ) => setAttributes( { showReviews: value } ) }
						/>

						{ showReviews &&
							<>
								<TextControl
									label={ __( 'Reviews', 'bikefinder-product-block' ) }
									type="number"
									min="0"
									value={ reviews }
									onChange={ ( value ) => setAttributes( { reviews: parseInt( value ) } ) }
								/>

								<TextControl
									label={ __( 'Rating', 'bikefinder-product-block' ) }
									type="number"
									step="0.1"
									min="0"
									max="5"
									value={ rating }
									onChange={ ( value ) => isFloatValue( value ) && setAttributes( { rating: value } ) }
								/>
							</>
						}
					</PanelBody>

					<PanelBody title="Buttons and links" initialOpen={false}>
						<TextControl
							label={ __( 'Buy button label', 'bikefinder-product-block' ) }
							value={ primaryButtonText }
							onChange={ ( value ) => setAttributes( { primaryButtonText: value } ) }
						/>

						<hr />

						{ secondaryButtons && secondaryButtons.map( ( button, index ) => {
							return (
								<div key={ index }>
									<TextControl
										label={ __( 'Button label', 'bikefinder-product-block' ) }
										value={ button.label }
										onChange={ ( value ) => {
											const newButtons = [ ...secondaryButtons ];
											newButtons[ index ].label = value;
											setAttributes( { secondaryButtons: newButtons } );
										}}
									/>
									<TextControl
										label={ __( 'Button link', 'bikefinder-product-block' ) }
										value={ button.link }
										onChange={ ( value ) => {
											const newButtons = [ ...secondaryButtons ];
											newButtons[ index ].link = value;
											setAttributes( { secondaryButtons: newButtons } );
										}}
									/>

									<button className="button button-secondary" onClick={ () => {
										const newButtons = [ ...secondaryButtons ];
										newButtons.splice( index, 1 );
										setAttributes( { secondaryButtons: newButtons } );
									}}>
										{ __( 'Remove link button', 'bikefinder-product-block' ) }
									</button>

									<hr />
								</div>
							)
						} ) }

						<button className="button button-secondary" onClick={ () => {
							const newButtons = [ ...secondaryButtons ];
							newButtons.push( { label: '', link: '' } );
							setAttributes( { secondaryButtons: newButtons } );
						}}>
							{ __( 'Add link button', 'bikefinder-product-block' ) }
						</button>
					</PanelBody>

					<PanelBody title="Images" initialOpen={ false }>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( media ) => {
									const newImages = media.map( image => image.id );
									setAttributes( { images: newImages } );
								} }
								allowedTypes={ [ 'image' ] }
								multiple
								value={ images }
								render={ ( { open } ) => (
									<>
										{ chosenImages && chosenImages.length > 0 &&
											chosenImages.map( ( image ) => <img key={ image.id } src={ image?.source_url } alt="" /> )
										}

										<button className="button button-primary" onClick={ open }>
											{ images.length > 0 &&
												__( 'Modify images', 'bikefinder-product-block' )
											}

											{ ! images || images.length < 1 &&
												__( 'Select images', 'bikefinder-product-block' )
											}
										</button>

										<button className="button button-secondary" onClick={ () => setAttributes( { images: [] } ) }>
											{ __( 'Remove images', 'bikefinder-product-block' ) }
										</button>
									</>
								) }
							/>
						</MediaUploadCheck>
					</PanelBody>
				</InspectorControls>
			}

			<ServerSideRender
				block="bikefinder/product"
				attributes={ attributes }
			/>
		</div>
	);
}
