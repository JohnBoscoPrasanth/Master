const resetPasswordTemplate = (resetLink) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
    }
    .container {
      width: 80%;
      margin: 20px auto;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background-color: #4CAF50;
      color: #fff;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      padding: 20px 20px 10px;
      text-align: center;
    }
    h1 {
      margin: 0;
      font-size: 32px;
      font-weight: 700;
      letter-spacing: 1px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .content {
      padding: 30px 20px;
      text-align: center;
    }
    p {
      color: #555;
      font-size: 18px;
      margin-bottom: 20px;
    }
    .button {
      display: inline-block;
      padding: 18px 36px;
      background-color: #4CAF50;
      color: #fff;
      text-decoration: none;
      border-radius: 4px;
      transition: background-color 0.3s ease;
      font-size: 20px;
      font-weight: bold;
      letter-spacing: 1px;
      border: none;
    }
    .button:hover {
      background-color: #45a049;
    }
    .footer {
      background-color: #f5f5f5;
      padding: 20px;
      text-align: center;
      font-size: 16px;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Master</h1>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>We've received a request to reset your password on Master. Click the button below to set a new password:</p>
      <a class="button" href="${resetLink}" style="color: #fff; font-weight: bold; text-decoration: none;">Reset Password</a>
      <p>If you didn't make this request, you can safely ignore this email.</p>
    </div>
    <div class="footer">
      <p>This email was sent by Master. If you have any questions, please contact our support team.</p>
    </div>
  </div>
</body>
</html>
`;

module.exports = resetPasswordTemplate;
