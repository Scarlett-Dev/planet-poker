import { User } from "./user";

export interface sessionUserData {
    // sessionId: String;
    username: string, 
    selectedScore: string

    // users: User[];
}

//user(s)
//Name -> suffix with # and random generated number
// Show name without suffix, slice it at #
// {
// "sessionId": "randomGeneratedId",
//     "users": [ 
//         {
//             "name": "Potato#27348924",
//             "selectedScore": "3"
//         },        
//         {
//             "name": "Eerappel#1122334",
//             "selectedScore": "1"
//         }
//      ]
// }