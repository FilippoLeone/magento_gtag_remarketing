/magento/app/design/frontend/rwd/default/template/catalog/product/view.phtml
##### WHERE `rwd` IS THE TEMPLATE NAME #####

<?php $_product = Mage::registry("current_product");?>
<?php if ($_product && $_product->getId()); ?>

<script>
gtag('event', 'page_view', {
    ecomm_prodid: '<?php echo $_product->getSku(); ?>',
    ecomm_pagetype: 'product',
    ecomm_totalvalue: "<?php echo $_product->getfinalprice(); ?>"
});
</script>

magento/app/design/frontend/rwd/default/template/checkout/cart.phtml

<?php $items = Mage::getSingleton("checkout/session")->getQuote()->getAllVisibleItems();?>
<?php $totalvalue = Mage::getSingleton('checkout/session')->getQuote()->getGrandTotal(); ?>

<script>
gtag('event', 'page_view', {
    ecomm_prodid: [<?php foreach ($items as $item) {?>"<?php echo $item->getSku();?>",<?php }?>],
    ecomm_pagetype: 'cart',
    ecomm_totalvalue: <?php echo $totalvalue; ?>
});
</script>


Success.phtml

<?php
$order = Mage::getModel("sales/order")->loadByIncrementId($this->getOrderId());
$items = $order->getAllVisibleItems();
?>

<script>
gtag('event', 'page_view', {
    ecomm_prodid: [<?php foreach ($items as $item) {?>"<?php echo $item->getSku();?>",<?php }?>],
    ecomm_pagetype: 'purchase',
    ecomm_totalvalue: "<?php echo $total; ?>"
});
</script>

// In development
Catalog/Product.phtml
<?php
$catalog = Mage::getModel("catalog/product");
$items = $catalog->getAllVisibleItems();
?>

<script>
gtag('event', 'page_view', {
    ecomm_prodid: [<?php foreach ($items as $item) {?>"<?php echo $item->getSku();?>",<?php }?>],
    ecomm_pagetype: 'category'
});
</script>


// In the header from magento backend add the GTAG AW-XXXX code.

