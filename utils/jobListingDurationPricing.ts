 

interface iAppProps{

    days:number
    price:number
    description:string
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const jobListingDurationSelector : iAppProps[] =[

    {
        days:30,
        price:99,
        description:"Classic Listing"
    },
    {
        days:60,
        price:150,
        description:"Premium Listing"
    }

    ,
    {
        days:90,
        price:200,
        description:"Promax listing"
    }
]