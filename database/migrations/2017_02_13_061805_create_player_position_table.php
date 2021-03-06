<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePlayerPositionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('player_position', function (Blueprint $table) {
            $table->integer('player_id')->unsigned();
            $table->foreign('player_id')->references('id')
                    ->on('players')->onDelete('cascade');

            $table->integer('position_id')->unsigned();
            $table->foreign('position_id')->references('id')
                ->on('positions')->onDelete('cascade');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('player_position');
    }
}
