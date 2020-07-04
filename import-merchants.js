const { Postgres } = require( '@infino/data-models' );
const fs = require( 'fs' );
const [ merchantPath ] = process.argv.slice( -1 );

function changeCase( o ) {
    return Object.keys( o ).reduce( ( acc, next ) => {
        acc[ camelCase( next ) ] = o[ next ];
        return acc;
    }, {} );
}

( async function exportData() {

    try {

        await Postgres.assertConnection();

    } catch ( error ) {

        console.log( 'Could not be connected' );
        throw error;

    }

    let allMerch;

    try {

            allMerch = await Postgres.OnlineMerchant.findAll({});

    } catch ( error ) {

        console.log( 'Could not destroy' );
        throw error;

    }

    fs.writeFile( merchantPath, JSON.stringify( allMerch ), 'utf-8', () => console.log( allMerch.length ) )

} )()