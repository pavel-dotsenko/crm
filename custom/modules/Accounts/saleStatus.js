$(() => {
    let statusField = $('div[field="sale_status_c"]');

    statusField
        .on('change', e => {
            if (statusField.find('#reason_field').length === 0) {
                let template = $('<div id="reason_field">')
                    .addClass('form-group')
                    .append($('<label for="reason">Факт-причина для изменения SaleStatus</label>')
                        .css('margin-top', '10px'))
                    .append($('<textarea required id="reason" name="reason" rows="2" cols="20"/>')
                        .addClass('form-control'));

                statusField.find('form#EditView').append(template);

                $('#inlineEditSaveButton')
                    .on('click', e => {
                        let reason = statusField.find('#reason').val();
                        if (reason.length > 0) {
                            let account_id = $('div[module="Accounts"]').attr('record_id');
                            $.ajax({
                                url: 'index.php?module=Accounts&action=attach_note',
                                type: 'POST',
                                data: {
                                    'account_id': account_id,
                                    'reason': reason,
                                },
                                success: () => {
                                    location.reload();
                                },
                                error: (e) => {
                                    console.log('Error attaching Note to Account! ', e.error.responseText);
                                }
                            });
                        }
                    });
            }
        });
});