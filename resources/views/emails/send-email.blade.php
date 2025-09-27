@php
/** @var \Illuminate\Contracts\Auth\MustVerifyEmail|\Illuminate\Foundation\Auth\User $user */
$appName = $appName ?? config('app.name');
$supportEmail = $supportEmail ?? config('mail.from.address');
@endphp
<!doctype html>
<html lang="id">

<head>
    <meta charset="utf-8">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Verifikasi Email - {{ $appName }}</title>
    <style>
        /* Reset ringan */
        body {
            margin: 0;
            padding: 0;
            background: #f6f7fb;
            font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
            color: #111827;
        }

        a {
            color: #0ea5e9;
            text-decoration: none;
        }

        /* Container */
        .wrapper {
            width: 100%;
            background: #f6f7fb;
            padding: 24px;
        }

        .mail {
            max-width: 640px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        .header {
            padding: 24px;
            text-align: center;
            background: #0ea5e9;
            color: #fff;
        }

        .logo {
            display: block;
            margin: 0 auto 8px;
            height: 40px;
        }

        .title {
            margin: 0;
            font-size: 20px;
            font-weight: 700;
        }

        .content {
            padding: 28px;
        }

        .greet {
            font-size: 16px;
            margin: 0 0 12px;
        }

        .text {
            font-size: 14px;
            line-height: 1.6;
            margin: 0 0 16px;
            color: #374151;
        }

        .btn-wrap {
            text-align: center;
            margin: 28px 0;
        }

        .content-card {
            text-align: center;
            background: #f3f4f6;
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 24px;
        }

        .btn {
            display: inline-block;
            padding: 12px 20px;
            border-radius: 10px;
            font-weight: 600;
            background: #0ea5e9;
            color: #fff !important;
        }

        .note {
            font-size: 12px;
            color: #6b7280;
            margin-top: 16px;
        }

        .code {
            word-break: break-all;
            color: #111827;
        }

        .divider {
            height: 1px;
            background: #e5e7eb;
            margin: 24px 0;
        }

        .footer {
            padding: 20px 28px 28px;
            font-size: 12px;
            color: #6b7280;
            text-align: center;
        }

        @media (prefers-color-scheme: dark) {
            body {
                background: #0b1220;
                color: #e5e7eb;
            }

            .mail {
                background: #0f172a;
            }

            .header {
                background: #0284c7;
            }

            .text,
            .note {
                color: #cbd5e1;
            }

            .divider {
                background: #1f2937;
            }
        }
    </style>
</head>

<body>
    <div class="wrapper">
        <div class="mail">
            <div class="header">
                {{-- Opsional: ganti src logo --}}
                {{-- <img class="logo" src="{{ asset('logo.png') }}" alt="{{ $appName }} Logo"> --}}
                <h1 class="title">{{ $data['title'] }}</h1>
            </div>

            <div class="content">
                <p class="greet">Halo {{ $user['name'] ?? 'Pengguna' }},</p>
                <p class="text">
                    {{ $data['message'] }}
                </p>

                <div class="content-card">
                    <p><strong>Username</strong> : {{$data['email']}}</p>
                    <p><strong>Password</strong> : {{$data['password']}}</p>
                </div>

                <div class="btn-wrap">
                    <a class="btn" href="{{ $data['url'] }}" target="_blank" rel="noopener">Login Disini</a>
                </div>
                <div class="divider"></div>

                <p class="note">
                    Jika Anda tidak merasa ingin bergabung, Anda dapat mengabaikan email ini.
                    <!-- Butuh bantuan? Balas email ini atau hubungi kami di {{ $supportEmail }}. -->
                </p>
            </div>

            <div class="footer">
                &copy; {{ date('Y') }} {{ $data['appName'] }}. Seluruh hak cipta.
            </div>
        </div>
    </div>
</body>

</html>