import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);


export async function POST(req) {
    try {
        const body = await req.json();

        // Save quote request to Supabase
        const { error: dbError } = await supabase
            .from("quote_requests")
            .insert([
                {
                    name: body.name,
                    email: body.email,
                    projectType: body.projectType,
                    projectTimeline: body.projectTimeline,
                    projectDesc: body.projectDesc,
                    budgetRange: body.budgetRange,
                    budgetCurrency: body.budgetCurrency.code,
                    budgetFlexibility: body.budgetFlexibility,
                    status: "Pending",
                    is_read: false,
                },
            ]);

        if (dbError) {
            console.log("Supabase Error:", dbError);

            return Response.json(
                {
                    success: false,
                    message: dbError.message,
                },
                {
                    status: 500,
                }
            );
        }

        const { data, error } = await resend.emails.send({

            from: "Neefex Portfolio <onboarding@resend.dev>",

            to: ["mhedheyghold12@gmail.com"],

            subject: `🚀 ${body.name} requested a ${body.projectType} quote`,

            html: `
<!DOCTYPE html>

<html>

<head>
<meta charset="UTF-8" />
</head>

<body style="
margin:0;
padding:40px 0;
background:#F5F7FA;
font-family:Inter,Arial,sans-serif;
">

<div style="
max-width:720px;
margin:auto;
background:#FFFFFF;
border-radius:28px;
overflow:hidden;
box-shadow:0 15px 40px rgba(0,0,0,.08);
">

<div style="
padding:50px 45px;
background:#111827;
color:white;
">

<span style="
display:inline-block;
padding:8px 18px;
border-radius:999px;
background:#FF6B35;
font-size:13px;
font-weight:600;
letter-spacing:.5px;
">
NEW CLIENT ENQUIRY
</span>

<h1 style="
margin:25px 0 10px;
font-size:38px;
line-height:1.2;
">
Someone wants to work with you 🚀
</h1>

<p style="
margin:0;
color:#D1D5DB;
font-size:16px;
line-height:1.7;
">
A new quote request has just been submitted from your portfolio.
</p>

</div>


<div style="padding:45px;">

<table width="100%" cellpadding="14" cellspacing="0">

<tr>

<td width="35%" style="color:#6B7280;font-weight:600;">
Client Name
</td>

<td style="font-weight:600;color:#111827;">
${body.name}
</td>

</tr>

<tr>

<td style="color:#6B7280;font-weight:600;">
Email Address
</td>

<td>

<a
href="mailto:${body.email}"
style="
color:#2563EB;
font-weight:600;
text-decoration:none;
">
${body.email}
</a>

</td>

</tr>

<tr>

<td style="color:#6B7280;font-weight:600;">
Project Type
</td>

<td>

<span style="
display:inline-block;
padding:8px 18px;
border-radius:999px;
background:#EEF4FF;
color:#2563EB;
font-weight:600;
">
${body.projectType}
</span>

</td>

</tr>

<tr>

<td style="color:#6B7280;font-weight:600;">
Timeline
</td>

<td>

<span style="
display:inline-block;
padding:8px 18px;
border-radius:999px;
background:#FFF4EC;
color:#FF6B35;
font-weight:600;
">
${body.projectTimeline}
</span>

</td>

</tr>

<tr>

<td style="color:#6B7280;font-weight:600;">
Budget
</td>

<td>

<span style="
display:inline-block;
padding:8px 18px;
border-radius:999px;
background:#ECFDF5;
color:#059669;
font-weight:700;
">
${body.budgetCurrency.code} ${body.budgetRange}
</span>

</td>

</tr>

<tr>

<td style="color:#6B7280;font-weight:600;">
Budget Flexibility
</td>

<td>

<span style="
display:inline-block;
padding:8px 18px;
border-radius:999px;
background:#F3F4F6;
color:#111827;
font-weight:600;
">
${body.budgetFlexibility}
</span>

</td>

</tr>

</table>


<div style="margin-top:45px;">

<h3 style="
margin-bottom:15px;
font-size:20px;
color:#111827;
">
Project Brief
</h3>

<div style="
background:#F9FAFB;
padding:24px;
border-left:5px solid #FF6B35;
border-radius:16px;
line-height:1.9;
color:#4B5563;
font-size:15px;
">

${body.projectDesc}

</div>

</div>

</div>


<div style="
background:#F9FAFB;
padding:30px;
text-align:center;
border-top:1px solid #E5E7EB;
">

<p style="
margin:0;
font-size:14px;
color:#6B7280;
">
This enquiry was sent from your portfolio website.
</p>

<p style="
margin-top:10px;
font-size:13px;
color:#9CA3AF;
">
© ${new Date().getFullYear()} Neefex • Full Stack Developer
</p>

</div>

</div>

</body>

</html>
            `

        });

        if (error) {
            console.log(error);
            return Response.json(error, { status: 500 });
        }

        return Response.json({
            success: true,
            data,
        });

    } catch (err) {

        console.log(err);

        return Response.json(
            {
                success: false,
                message: err.message,
            },
            {
                status: 500,
            }
        );

    }
}