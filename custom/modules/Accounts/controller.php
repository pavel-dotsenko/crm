<?php

if (!defined('sugarEntry') || !sugarEntry) {
  die('Not A Valid Entry Point');
}

class CustomAccountsController extends SugarController
{
    /**
   *  Attach new module <Notes> to Account, containing the reason why SaleStatus has been changed.
   *  Called from detailview of Accouns.
   */
  public function action_attach_note()
  {
    try {

        if (!isset($_REQUEST['account_id']) || !$_REQUEST['account_id']) {
        throw new Exception('Error. Undefined Account ID.');
      }

      $account = BeanFactory::getBean('Accounts', $_REQUEST['account_id']);

      if (!$account) {
        throw new Exception('Error. Wrong Account ID');
      }

      global $current_user;

      $note = BeanFactory::newBean('Notes');
      $note->parent_type = 'Accounts';
      $note->parent_id = $account->id;
      $note->assigned_user_id = $current_user->id;
      $note->contact_id = '';
      $note->name = 'Sale Status changed';
      $note->description = 'REASON: ' . $_REQUEST['reason'];

      $note->save();

      } catch (Exception $e) {
        die('Error attaching Note to account! ' . $e->getMessage());
      }
  }
}
