<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payment_krediturs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kreditur_id')->constrained('krediturs')->cascadeOnDelete();
            $table->date('date');
            $table->unsignedInteger('amount')->default(0);
            $table->string('payment_method');
            $table->text('note')->nullable();
            $table->text('file_image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_krediturs');
    }
};
