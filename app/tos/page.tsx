import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR TERMS & SERVICES — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple Terms & Services for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Contact information: marc@shipfa.st
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - Ownership: when buying a package, users can download code to create apps. They own the code but they do not have the right to resell it. They can ask for a full refund within 7 day after the purchase.
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Link to privacy-policy: https://shipfa.st/privacy-policy
// - Governing Law: France
// - Updates to the Terms: users will be updated by email

// Please write a simple Terms & Services for my site. Add the current date. Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

const TOS = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Terms and Conditions for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Here’s a **Terms of Service** tailored for your website, **Track KOTC**, based on the provided details:

---

Terms of Service

**Last Updated: November 20, 2024**

Welcome to Track KOTC (“we,” “us,” or “our”). These Terms of Service (“Terms”) govern your access to and use of our website located at [https://trackkotc.com](https://trackkotc.com) (the “Website”). By accessing or using the Website, you agree to comply with and be bound by these Terms. If you do not agree to these Terms, please do not use the Website.

---

1. Use of the Website
1.1 **Eligibility**: By accessing the Website, you represent that you are at least 13 years of age. If you are under the age of 18, you may only use the Website with the consent of a parent or guardian.

1.2 **Permitted Use**: You agree to use the Website only for lawful purposes and in compliance with these Terms. Any unauthorized use of the Website, including but not limited to scraping or exploiting our data, is prohibited.

1.3 **Changes to the Website**: We reserve the right to modify, suspend, or discontinue any part of the Website at any time without prior notice.

---

2. Data Collection and Privacy
2.1 **User Data**: We do not collect any personal data from users.

2.2 **Cookies and Non-Personal Data**: We use web cookies to enhance your browsing experience. For more details, please refer to our [Privacy Policy](https://trackkotc/privacy-policy).

---

3. Intellectual Property
3.1 **Ownership**: All content on the Website, including text, graphics, logos, and software, is the property of Track KOTC and protected by applicable copyright and intellectual property laws.

3.2 **Restrictions**: You may not reproduce, distribute, modify, or create derivative works from any content on the Website without our express written permission.

---

4. Limitation of Liability
4.1 **No Warranties**: The Website and its content are provided “as is” and “as available” without any warranties of any kind, either express or implied.

4.2 **Disclaimer**: Track KOTC shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of the Website.

4.3 **Third-Party Links**: The Website may contain links to third-party websites. We are not responsible for the content or practices of these websites.

---

5. Governing Law
These Terms shall be governed by and construed in accordance with the laws of France. Any disputes arising from or relating to these Terms or the use of the Website shall be subject to the exclusive jurisdiction of the courts of France.

---

6. Updates to Terms of Service
We may update these Terms from time to time to reflect changes in our practices, the law, or other operational reasons. We will notify users of significant changes by posting an updated version of the Terms on the Website with the “Last Updated” date.

---

7. Contact Us
If you have any questions or concerns about these Terms, please contact us at:

**Email**: tyler.maschoff@gmail.com

By using Track KOTC, you acknowledge that you have read, understood, and agreed to these Terms of Service.`}
        </pre>
      </div>
    </main>
  );
};

export default TOS;
