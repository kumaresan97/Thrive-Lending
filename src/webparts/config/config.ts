// interface IList {
//   InvestorName: string;
//   LLC: string;
//   Phone: string;
//   Email: string;
//   PurchasePriceRange: string[];
//   Notes: string;
//   InvestorStrategy: string[];
//   // InvestorStrategy: null;
//   ContactID: string;
//   FileID: string;
//   AssignedTo: number;
//   attachments?: any[];
//   PeopleEmail: string;
//   Areas: string[];
//   ID: number;
//   Url: string;
//   Text: string;
//   AssignedName: string;
//   Created: string;
//   CreatedBy: string;
//   Modified: string;
//   ModifiedBy: string;
// }
// interface ICurrentUserInfo {
//   Email: string;
//   Id: number;
//   Title: string;
//   UserPrincipalName: string;
// }

// export namespace Config {
//   export const ListName = {
//     InvestorName: "Title",
//     LLC: "field_1",
//     Phone: "field_2",
//     Email: "field_3",
//     PurchasePriceRange: "field_4",
//   };
// }

interface ILoanproducts {
  Title: string;
  Description: string;
  URL: string;
  Image: String[];
  LoanTtype: string;
}
interface Ipartners {
  Title: string;
  Description: string;
  URL: string;
  Image: String[];
}

export { ILoanproducts, Ipartners };
