import {NextRequest,NextResponse} from "next/server";
const prefixes:Record<string,string>={"013":"Grameenphone","017":"Grameenphone","014":"Banglalink","019":"Banglalink","016":"Airtel","018":"Robi","015":"Teletalk"};
export async function GET(req:NextRequest){
 const number=(req.nextUrl.searchParams.get("number")||"").replace(/\\D/g,"");
 if (!/^01\d{9}$/.test(number)) return NextResponse.json({success:false,error:"Invalid Bangladesh mobile number. Expected 11 digits starting with 01."},{status:400});
 const prefix=number.slice(0,3),carrier=prefixes[prefix];
 if(!carrier) return NextResponse.json({success:false,error:"Unsupported or unrecognized prefix."},{status:404});
 return NextResponse.json({success:true,number,carrier,carrier_code:prefix,location:"Bangladesh",type:"Mobile",international_format:"+88"+number});
}