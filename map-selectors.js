const { parseDomain } = require( 'parse-domain' );
const merchants = require( './output/merchants.json' );
const honey = require( './output/finalized-24-01-2019.json' );
const fs = require('fs');

console.log( honey[ 1 ] );

const selector = honey
.filter( merchant => !!merchant )
.filter( ( { url, metadata } ) => !!url )
.reduce( ( acc, { url, metadata } ) => {

    try {

        const { domain, topLevelDomains } = parseDomain( url.split( '://' )[ 1 ].split( '/' )[0] );
        const tail = topLevelDomains.join( '.' );
        // console.log( url.split( '://' )[ 1 ].split( '/' )[0] );
        // console.log( domain, 'domain' );
        // const matching = merchants.findIndex( el => el.hostName === `${ domain }.${ tail }` );
        acc[ `${ domain }.${ tail }` ] = metadata.pns_siteSelCartTotalPrice;

        return acc;

    } catch( error ) {

        console.log( error );
        console.log( url );

        return acc;

    }
}, {} );

fs.writeFile( 'output/selectors.json', JSON.stringify( selector, 0, null, 4 ), 'utf-8', () => console.log( 'done' ) )
