import { NextRequest, NextResponse } from 'next/server';
import * as AWS from 'aws-sdk';
import * as nodemailer from 'nodemailer';
import { render } from '@react-email/components';
import App from '@/emails/application_received';

export async function GET(req: NextRequest) {
	return NextResponse.json({ ok: true });
	AWS.config.update({
		accessKeyId: process.env.AWS_ACCESS_KEY,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
		region: 'ca-central-1',
	});
	AWS.config.getCredentials(function (error) {
		if (error) {
			console.log(error.stack);
		}
	});
	const ses = new AWS.SES({ apiVersion: '2010-12-01' });
	const adminMail = 'team@hack49.com';
	const html = render(<App email="sharmavihaan190@gmail.com" code="BROOOO" />);
	const transporter = nodemailer.createTransport({
		SES: ses,
	});
	try {
		const response = await transporter.sendMail({
			from: adminMail,
			to: 'sharmavihaan190@gmail.com',
			subject: 'Test Mail',
			html,
		});

		return response?.messageId ? NextResponse.json({ ok: true }) : NextResponse.json({ ok: false, msg: 'Failed to send email' });
	} catch (error) {
		console.log('ERROR', error.message);
		return NextResponse.json({ ok: false, msg: 'Failed to send email' });
	}
}
