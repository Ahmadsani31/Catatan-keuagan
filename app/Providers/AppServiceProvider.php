<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
        VerifyEmail::toMailUsing(function (object $notifiable, string $url) {
            return (new MailMessage)
                // ->subject('Verify Email Address')
                // ->greeting('Welcome ' . $notifiable->name)
                // ->line('Please, click the button below to verify your email address.')
                // ->action('Verify Email', $url);
                ->subject('[NO-REPLAY]Verifikasi Email - ' . config('app.name'))
                ->view('emails.verify-email', [
                    'verificationUrl' => $url,
                    'user'            => $notifiable,
                    'appName'         => config('app.name'),
                    'supportEmail'    => config('mail.from.address'),
                ]);
        });
    }
}
