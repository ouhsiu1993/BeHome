import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message?: string;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { name, phone, email, subject, message } = body;

    if (!name || !phone || !subject) {
      return NextResponse.json(
        { success: false, message: '請填寫必填欄位（姓名、電話、諮詢項目）' },
        { status: 400 }
      );
    }

    const mailOptions = {
      from: `"BEHOME 網站諮詢" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_RECEIVER || process.env.GMAIL_USER,
      replyTo: email || undefined,
      subject: `[網站諮詢] ${subject} - ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #5A5A40; border-bottom: 2px solid #5A5A40; padding-bottom: 10px;">
            新的諮詢表單
          </h2>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 12px; background: #F5F2ED; font-weight: bold; width: 120px;">姓名</td>
              <td style="padding: 12px; background: #fafafa;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #F5F2ED; font-weight: bold;">電話</td>
              <td style="padding: 12px; background: #fafafa;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #F5F2ED; font-weight: bold;">電子郵件</td>
              <td style="padding: 12px; background: #fafafa;">${email || '（未填寫）'}</td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #F5F2ED; font-weight: bold;">諮詢項目</td>
              <td style="padding: 12px; background: #fafafa;">${subject}</td>
            </tr>
          </table>
          
          <div style="background: #F5F2ED; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <h3 style="margin: 0 0 10px 0; color: #5A5A40;">訊息內容</h3>
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${message || '（未填寫）'}</p>
          </div>
          
          <p style="color: #888; font-size: 12px; margin-top: 30px;">
            此郵件由 BEHOME Whole Climate 網站自動發送
          </p>
        </div>
      `,
      text: `
新的諮詢表單

姓名：${name}
電話：${phone}
電子郵件：${email || '（未填寫）'}
諮詢項目：${subject}

訊息內容：
${message || '（未填寫）'}

---
此郵件由 BEHOME Whole Climate 網站自動發送
      `.trim(),
    };

    await transporter.sendMail(mailOptions);
    console.log(`諮詢表單已發送: ${name} - ${subject}`);

    return NextResponse.json({
      success: true,
      message: '感謝您的諮詢，我們將盡快與您聯繫！',
    });
  } catch (error) {
    console.error('郵件發送失敗:', error);
    return NextResponse.json(
      { success: false, message: '發送失敗，請稍後再試或直接撥打電話聯繫我們' },
      { status: 500 }
    );
  }
}
