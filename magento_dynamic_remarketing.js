Pathlists:

magento/app/design/frontend/rwd/default/template/catalog/product/view.phtml -> productpage
magento/app/design/frontend/rwd/default/template/catalogsearch/result.phtml -> searchresults
magento/app/design/frontend/rwd/default/template/checkout/cart.phtml -> cart
magento/app/design/frontend/base/default/template/catalog/category/view.phtml -> catalog
magento/app/design/frontend/base/default/template/checkout/success.phtml -> purchase
//** For the homepage please take a look in CMS/Pages and add it there. **/

Note that those paths can change from theme to theme, a decent research on this matter is required to understand how to correctly implement everything.

Home:

<script>
gtag('event', 'page_view', {
    ecomm_pagetype: 'home'
});
</script>

Product:

<?php $_product = Mage::registry("current_product"); ?>
<?php if ($_product && $_product->getId()); ?>

<script>
gtag('event', 'page_view', {
    ecomm_prodid: '<?php echo $_product->getSku(); ?>',
    ecomm_pagetype: 'product',
    ecomm_totalvalue: "<?php echo $_product->getfinalprice(); ?>"
});
</script>

Cart:

<?php $items = Mage::getSingleton("checkout/session")->getQuote()->getAllVisibleItems();?>
<?php $totalvalue = Mage::getSingleton('checkout/session')->getQuote()->getGrandTotal(); ?>

<script>
gtag('event', 'page_view', {
    ecomm_prodid: [<?php foreach ($items as $item) {?>"<?php echo $item->getSku();?>",<?php }?>],
    ecomm_pagetype: 'cart',
    ecomm_totalvalue: <?php echo $totalvalue; ?>
});
</script>

Purchase:

<?php
$order = Mage::getModel("sales/order")->loadByIncrementId($this->getOrderId());
$items = $order->getAllVisibleItems();
$total = $order->getGrandTotal();
?>

<script>
gtag('event', 'page_view', {
    ecomm_prodid: [<?php foreach ($items as $item) {?>"<?php echo $item->getSku();?>",<?php }?>],
    ecomm_pagetype: 'purchase',
    ecomm_totalvalue: "<?php echo $total; ?>"
});
</script>

Searchresults:

<script>
gtag('event', 'page_view', {
    ecomm_pagetype: 'searchresults'
});
</script>

//** Please note that the prodid for the category is WIP. **/

<?php $catname = $this->GetCurrentCategory()->getName(); ?>

<script>
gtag('event', 'page_view', {
    ecomm_pagetype: 'catalog',
    ecomm_category: '<?php echo $catname; ?>'
});
</script>