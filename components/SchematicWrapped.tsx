"use client";

import {useUser} from "@clerk/nextjs";
import { useSchematicEvents } from "@schematichq/schematic-react";
import { useEffect } from "react";


const SchematicWrapped = ({children}: {children: React.ReactNode}) => {

  const {user} = useUser();
  const {identify} = useSchematicEvents();

  useEffect(() => {
    const userName=
    user?.username??
    user?.fullName??
    user?.emailAddresses[0].emailAddress??
    user?.id;
    if(user?.id){
      identify({
      //company level key

        company:{
        keys:{
            id: user.id,
        },
        name:userName,
    },

    //user level key
    keys:{
        id: user.id,
    },
    name:userName,  
    });
}
  }, [user, identify]);

  return (
    <div>
      {children}
    </div>
  )
  
}

export default SchematicWrapped
