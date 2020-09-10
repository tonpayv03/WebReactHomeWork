import '../assets/indexsecond.css';
import $ from 'jquery';

$(document).ready(function () {

    // on pizza item detail toggle
    $(document).on('click', '.pizza-item-card-commands-detail', function(event) {
        var card = $(this).closest('.pizza-item-card'); // หาลูกของ pizza-item-card
        if(card.hasClass('pizza-item-card--expanded')) { // ถ้ามี
            // collapse
            card.removeClass('pizza-item-card--expanded'); // ลบคลาสนี้
            card.find('.pizza-item-card-detail').slideUp(); // find pizza-item-card-detail แล้ว slideUp
        } else {
            // expand
            card.addClass('pizza-item-card--expanded'); // เพิ่มคลาสนี้
            card.find('.pizza-item-card-detail').slideDown(); // find pizza-item-card-detail แล้ว slideDown
        }
    });

});