import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button,
} from '@react-email/components';

interface VerificationEmailProps {
    name: string;
    dueAmount: string;
}

export default function PaymentReminderEmailTemplate({ name, dueAmount }: VerificationEmailProps) {
    return (
        <Html lang="en" dir="ltr">
            <Head>
                <title>Payment Reminder</title>
                <Font
                    fontFamily="Roboto"
                    fallbackFontFamily="Verdana"
                    webFont={{
                        url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
                        format: 'woff2',
                    }}
                    fontWeight={400}
                    fontStyle="normal"
                />
            </Head>
            <Preview>Here&apos;s your due payemnt: {dueAmount}</Preview>
            <Section>
                <Row>
                    <Heading as="h2">Hello {name},</Heading>
                </Row>
                <Row>
                    <Text>
                        Thank you for staying connected with us for so many years.
                    </Text>
                </Row>
                <Row>
                    <Text>{dueAmount}</Text>
                </Row>
                <Row>
                    <Text>
                        This is small reminder for your due payemnt.
                    </Text>
                </Row>
                {/* <Row>
            <Button
              href={`http://localhost:3000/verify/${username}`}
              style={{ color: '#61dafb' }}
            >
              Verify here
            </Button>
          </Row> */}
            </Section>
        </Html>
    );
}
