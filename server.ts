import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parsers
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Route - Health Check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // API Route - Booking & Contact Form Submission (SMTP Integration)
  app.post('/api/book', async (req, res) => {
    try {
      const booking = req.body;
      const {
        name,
        email,
        phone,
        packageId,
        packageName,
        vehicleSize,
        bookingDate,
        bookingTime,
        addOns,
        specialNotes,
        totalPrice,
      } = booking;

      // Basic validation
      if (!name || !email || !phone || !packageId) {
        res.status(400).json({
          success: false,
          message: 'Missing required customer details.',
        });
        return;
      }

      // Convert size label to uppercase/clean
      const sizeLabel = vehicleSize ? vehicleSize.toUpperCase() : 'SEDAN';
      const formattedDate = bookingDate ? new Date(bookingDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }) : 'N/A';

      // Design raw Starlink-style modern, high-contrast monospace layout
      const emailSubject = `[GLOSSDETAIL.] New Luxury Order CONFIRMED - ${name}`;
      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              background-color: #050505;
              color: #f5f5f7;
              margin: 0;
              padding: 40px 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #0c0c0e;
              border: 1px solid #1f1f23;
              padding: 32px;
              box-sizing: border-box;
            }
            .header {
              border-bottom: 1px solid #1f1f23;
              padding-bottom: 24px;
              margin-bottom: 24px;
            }
            .title {
              font-size: 20px;
              letter-spacing: 0.15em;
              font-weight: 600;
              color: #ffffff;
              margin: 0 0 8px 0;
            }
            .subtitle {
              font-size: 11px;
              letter-spacing: 0.08em;
              color: #8f8f9e;
              margin: 0;
              text-transform: uppercase;
            }
            .section-label {
              font-size: 10px;
              letter-spacing: 0.1em;
              color: #8f8f9e;
              text-transform: uppercase;
              margin-top: 24px;
              margin-bottom: 8px;
              border-left: 2px solid #ffffff;
              padding-left: 8px;
            }
            .grid-table {
              width: 100%;
              border-collapse: collapse;
              margin: 12px 0 24px 0;
            }
            .grid-table td {
              padding: 8px 0;
              border-bottom: 1px solid #121215;
              font-size: 14px;
            }
            .label-col {
              color: #8f8f9e;
              width: 35%;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }
            .value-col {
              color: #ffffff;
              font-weight: 500;
              text-align: right;
            }
            .addons-list {
              padding-left: 0;
              margin: 8px 0;
              list-style-type: none;
            }
            .addons-list li {
              font-size: 13px;
              color: #ffffff;
              margin-bottom: 6px;
              border-bottom: 1px dashed #1f1f23;
              padding-bottom: 4px;
            }
            .price-total {
              font-size: 22px;
              color: #ffffff;
              font-weight: bold;
              text-align: right;
              padding: 16px 0;
              border-top: 1px solid #ffffff;
              margin-top: 16px;
              letter-spacing: 0.05em;
            }
            .footer {
              margin-top: 32px;
              padding-top: 16px;
              border-top: 1px solid #1f1f23;
              font-size: 11px;
              color: #55555d;
              text-align: center;
              line-height: 1.6;
            }
            .tag {
              display: inline-block;
              background-color: #1f1f23;
              color: #ffffff;
              padding: 2px 6px;
              font-size: 10px;
              font-family: monospace;
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <p class="subtitle">AUTOMATED LUXURY DETAILED MATRIX CLIENT</p>
              <h2 class="title">GLOSSDETAIL</h2>
              <span class="tag">ORDER ID: DET-${Math.floor(100000 + Math.random() * 900000)}</span>
            </div>

            <div class="section-label">CLIENT SPECIFICATIONS</div>
            <table class="grid-table">
              <tr>
                <td class="label-col">Full Name</td>
                <td class="value-col">${name}</td>
              </tr>
              <tr>
                <td class="label-col">Email Address</td>
                <td class="value-col">${email}</td>
              </tr>
              <tr>
                <td class="label-col">Phone Number</td>
                <td class="value-col">${phone}</td>
              </tr>
            </table>

            <div class="section-label">GLOSSDETAIL CORE CONFIGURATION</div>
            <table class="grid-table">
              <tr>
                <td class="label-col">Selected Core</td>
                <td class="value-col" style="letter-spacing:0.05em; font-weight:bold;">${packageName || packageId.toUpperCase().replace('-', ' ')}</td>
              </tr>
              <tr>
                <td class="label-col">Vehicle Size</td>
                <td class="value-col">${sizeLabel}</td>
              </tr>
              <tr>
                <td class="label-col">Appointment Date</td>
                <td class="value-col">${formattedDate}</td>
              </tr>
              <tr>
                <td class="label-col">Preferred Slot</td>
                <td class="value-col" style="text-transform: uppercase;">${bookingTime}</td>
              </tr>
            </table>

            ${addOns && addOns.length > 0 ? `
              <div class="section-label">MODULAR TECH ADD-ONS</div>
              <ul class="addons-list">
                ${addOns.map((add: string) => `<li>+ ${add}</li>`).join('')}
              </ul>
            ` : ''}

            ${specialNotes ? `
              <div class="section-label">CLIENT FIELD MEMORANDUM</div>
              <div style="background-color: #09090b; border: 1px solid #151518; padding: 12px; font-size: 13px; color: #a1a1aa; font-style: italic; line-height: 1.4; margin-top: 8px;">
                "${specialNotes}"
              </div>
            ` : ''}

            <div class="price-total">
              <span style="font-size:12px; color:#8f8f9e; font-weight:normal; text-transform:uppercase; letter-spacing:0.1em; display:block; margin-bottom:4px;">PROPOSED AMOUNT</span>
              RM ${totalPrice}
            </div>

            <div class="footer">
              This is a digital record generated by the glossdetail. automated reservation platform.<br>
              Inquiries: contact@glossdetail.com | Inspired by Space-age Engineering
            </div>
          </div>
        </body>
        </html>
      `;

      // SMTP environment check
      const smtpHost = process.env.SMTP_HOST;
      const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const smtpSecure = process.env.SMTP_SECURE === 'true';
      const receiverEmail = process.env.RECEIVER_EMAIL || 'ivanloong05@gmail.com';

      let emailStatus = 'simulated';

      if (smtpHost && smtpUser && smtpPass) {
        try {
          const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpSecure,
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          });

          await transporter.sendMail({
            from: `"glossdetail." <${smtpUser}>`,
            to: receiverEmail,
            subject: emailSubject,
            html: emailHtml,
          });
          emailStatus = 'sent';
        } catch (mailError: any) {
          console.error('[SMTP Error] Failed to send electronic mail via server:', mailError);
          emailStatus = `failed: ${mailError.message}`;
        }
      } else {
        // Clear mock debugging info output for AI Studio preview logs
        console.log('\n--- SIMULATED SMTP BOOKING EMAIL TRANSMISSION ---');
        console.log(`To Destination: ${receiverEmail}`);
        console.log(`Subject Line: ${emailSubject}`);
        console.log('--- BEAUTIFIED HTML CONTENT LOGGED SUCCESSFULLY ---');
        emailStatus = 'simulated_no_smtp_credentials';
      }

      res.status(200).json({
        success: true,
        message: 'Your high-end booking has been securely formulated.',
        emailStatus,
        booking: {
          clientName: name,
          email,
          phone,
          packageName,
          totalPrice,
          date: formattedDate,
          time: bookingTime
        }
      });
    } catch (e: any) {
      console.error('[API Error] Booking routing exception caught:', e);
      res.status(500).json({
        success: false,
        message: 'Failed to process booking on our secure server.',
        error: e.message
      });
    }
  });

  // Serve Frontend bundle files / development server with Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production setup
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Container live & listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[Server Core Error] Failsafe init fail:', err);
});
